import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignupForm from "../components/SignupForm";
import * as inviteModule from "../service/submitInvite";

test("renders with correct initial state", () => {
  render(<SignupForm onSuccess={() => {}} />);

  const nameField = screen.getByLabelText("Full Name");
  const emailField = screen.getByLabelText("Email");
  const confirmEmailField = screen.getByLabelText("Confirm Email");
  const submitButton = screen.getByRole("button", { name: "Send" });

  expect(nameField).toBeValid();
  expect(emailField).toBeValid();
  expect(confirmEmailField).toBeValid();
  expect(submitButton).toBeEnabled();
});

test("all fields are required", async () => {
  render(<SignupForm onSuccess={() => {}} />);

  const nameField = screen.getByLabelText("Full Name");
  const emailField = screen.getByLabelText("Email");
  const confirmEmailField = screen.getByLabelText("Confirm Email");
  const submitButton = screen.getByRole("button", { name: "Send" });

  userEvent.click(submitButton);

  await waitFor(() => {
    expect(nameField).toHaveErrorMessage("Required");
  });
  expect(emailField).toHaveErrorMessage("Required");
  expect(confirmEmailField).toHaveErrorMessage("Required");
  expect(submitButton).toBeDisabled();
});

test("name field is invalid if too short", async () => {
  render(<SignupForm onSuccess={() => {}} />);

  const nameField = screen.getByLabelText("Full Name");
  const submitButton = screen.getByRole("button", { name: "Send" });

  userEvent.type(nameField, "ab");
  userEvent.click(submitButton);

  await waitFor(() => {
    expect(nameField).toHaveErrorMessage(/at least 3/);
  });

  userEvent.type(nameField, "c");
  userEvent.click(submitButton);

  await waitFor(() => {
    expect(nameField).toBeValid();
  });
});

test("email field is invalid if not an email", async () => {
  render(<SignupForm onSuccess={() => {}} />);

  const emailField = screen.getByLabelText("Email");
  const submitButton = screen.getByRole("button", { name: "Send" });

  userEvent.type(emailField, "notanemail");
  userEvent.click(submitButton);

  await waitFor(() => {
    expect(emailField).toHaveErrorMessage(/valid email/);
  });

  userEvent.clear(emailField);
  userEvent.type(emailField, "test@example.com");
  userEvent.click(submitButton);

  await waitFor(() => {
    expect(emailField).toBeValid();
  });
});

test("confirm email field is invalid if not equal to email field", async () => {
  render(<SignupForm onSuccess={() => {}} />);

  const emailField = screen.getByLabelText("Email");
  const confirmEmailField = screen.getByLabelText("Confirm Email");
  const submitButton = screen.getByRole("button", { name: "Send" });

  userEvent.type(emailField, "test@example.com");
  userEvent.type(confirmEmailField, "notthesame");
  userEvent.click(submitButton);

  await waitFor(() => {
    expect(confirmEmailField).toHaveErrorMessage(/does not match/);
  });

  userEvent.clear(confirmEmailField);
  userEvent.type(confirmEmailField, "test@example.com");
  userEvent.click(submitButton);

  await waitFor(() => {
    expect(confirmEmailField).toBeValid();
  });
});

test("success callback is called when form submit succeeded", async () => {
  jest.spyOn(inviteModule, "default").mockResolvedValueOnce("Registered");

  const callback = jest.fn();
  render(<SignupForm onSuccess={callback} />);

  const nameField = screen.getByLabelText("Full Name");
  const emailField = screen.getByLabelText("Email");
  const confirmEmailField = screen.getByLabelText("Confirm Email");
  const submitButton = screen.getByRole("button", { name: "Send" });

  userEvent.type(nameField, "Test User");
  userEvent.type(emailField, "test@example.com");
  userEvent.type(confirmEmailField, "test@example.com");
  userEvent.click(submitButton);

  await waitFor(() => {
    expect(callback).toHaveBeenCalled();
  });
});

test("error is shown when form submit failed", async () => {
  jest
    .spyOn(inviteModule, "default")
    .mockRejectedValueOnce(
      new inviteModule.InviteError("Error message string")
    );

  const callback = jest.fn();
  render(<SignupForm onSuccess={callback} />);

  const nameField = screen.getByLabelText("Full Name");
  const emailField = screen.getByLabelText("Email");
  const confirmEmailField = screen.getByLabelText("Confirm Email");
  const submitButton = screen.getByRole("button", { name: "Send" });

  userEvent.type(nameField, "Test User");
  userEvent.type(emailField, "test@example.com");
  userEvent.type(confirmEmailField, "test@example.com");
  userEvent.click(submitButton);

  const errorMessage = await screen.findByText("Error message string");
  expect(errorMessage).toBeVisible();
});
