import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Modal from "../components/Modal";

test("renders correctly when open", () => {
  render(
    <Modal title="Title" open onClose={() => {}}>
      Content
    </Modal>
  );

  expect(screen.getByRole("heading", { name: "Title" })).toBeVisible();
  expect(screen.getByText("Content")).toBeVisible();
});

test("does not render when close", () => {
  render(
    <Modal title="Title" open={false} onClose={() => {}}>
      Content
    </Modal>
  );

  expect(
    screen.queryByRole("heading", { name: "Title" })
  ).not.toBeInTheDocument();
  expect(screen.queryByText("Content")).not.toBeInTheDocument();
});

test("closes when the close button is clicked", async () => {
  const close = jest.fn();
  render(
    <Modal title="Title" open onClose={close}>
      Content
    </Modal>
  );

  userEvent.click(screen.getByRole("button", { name: "Close" }));

  expect(close).toHaveBeenCalled();
});

test("closes when the backdrop is clicked", async () => {
  const close = jest.fn();
  render(
    <Modal title="Title" open onClose={close}>
      Content
    </Modal>
  );

  userEvent.click(screen.getByTestId("modal-bg"));

  expect(close).toHaveBeenCalled();
});
