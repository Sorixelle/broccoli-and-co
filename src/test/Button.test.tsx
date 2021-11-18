import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Button from "../components/Button";

test("renders text correctly", () => {
  render(<Button>Test</Button>);

  const button = screen.getByRole("button", { name: "Test" });
  expect(button).toBeVisible();
  expect(button).toBeEnabled();
});

test("disabled when prop set", () => {
  render(<Button disabled>Test</Button>);

  const button = screen.getByRole("button", { name: "Test" });
  expect(button).toBeDisabled();
});

test("calls onClick prop when clicked", () => {
  const callback = jest.fn();
  render(<Button onClick={callback}>Test</Button>);

  userEvent.click(screen.getByRole("button", { name: "Test" }));

  expect(callback).toHaveBeenCalled();
});
