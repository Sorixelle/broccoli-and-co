import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import InviteSuccess from "../components/InviteSuccess";

test("runs callback when OK button clicked", () => {
  const callback = jest.fn();
  render(<InviteSuccess onConfirm={callback} />);

  userEvent.click(screen.getByRole("button", { name: "OK" }));

  expect(callback).toHaveBeenCalled();
});
