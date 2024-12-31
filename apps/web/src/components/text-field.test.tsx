import "@testing-library/jest-dom/vitest";

import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextField } from "./text-field";
import { useState } from "react";

type PropsOf<T> = T extends React.ComponentType<infer P> ? P : never;

function ControlledTextField(
  props: Omit<PropsOf<typeof TextField>, "value" | "onChange">,
) {
  const [value, setValue] = useState("");
  return <TextField value={value} onChange={setValue} {...props} />;
}

test("renders and updates the state correctly", async () => {
  const label = "Test";
  const valueAssertion = "hello there";

  render(<ControlledTextField label={label} name="test" />);

  await userEvent.type(screen.getByLabelText(label), valueAssertion);

  expect(screen.getByLabelText(label)).toHaveValue(valueAssertion);
});
