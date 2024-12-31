export function TextField({
  label,
  name,
  value,
  onChange,
}: {
  label: React.ReactNode;
  name: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="gap-0.5 flex flex-col items-start">
      <label htmlFor={name} className="text-xs font-bold">
        {label}
      </label>

      <input
        name={name}
        id={name}
        className="flex-1 bg-slate-50 border border-slate-300 rounded-md shadow-sm px-2 py-1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
