import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";

interface SearchStateSerializer<T> {
  write: (value: T) => string;
  read: (value: string) => T;
}

function readSearchParam<T>({
  searchParams,
  key,
  defaultValue,
  serializer,
}: {
  searchParams: URLSearchParams;
  key: string;
  defaultValue: T;
  serializer: SearchStateSerializer<T>;
}) {
  const value = searchParams.get(key);
  return value ? serializer.read(value) : defaultValue;
}

export function useSearchState<T>({
  defaultState,
  key,
  serializer,
}: {
  defaultState: T;
  key: string;
  serializer: SearchStateSerializer<T>;
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );

  const currentValue = useMemo(
    () =>
      readSearchParam({
        searchParams: searchParams,
        key,
        defaultValue: defaultState,
        serializer,
      }),
    [defaultState, key, searchParams, serializer],
  );

  const updateCurrentValue = useCallback(
    (value: T) => {
      const nextSearch = new URLSearchParams(searchParams);
      nextSearch.set(key, serializer.write(value));

      navigate({
        search: nextSearch.toString(),
      });
    },
    [key, searchParams, navigate, serializer],
  );

  return [currentValue, updateCurrentValue] as const;
}
