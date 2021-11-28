import { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import SignupForm from "./SignupForm";
import InviteSuccess from "./InviteSuccess";

function MainContent() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  function handleClick() {
    setShowModal(true);
  }

  function handleFormSuccess() {
    setSuccess(true);
  }

  function handleModalClose() {
    setShowModal(false);
  }

  function handleModalCloseFinish() {
    setSuccess(false);
  }

  return (
    <>
      <main className="flex flex-col flex-grow items-center justify-center gap-6 px-4 md:px-16">
        <h1 className="text-center">A better way to enjoy every day.</h1>
        <p className="text-center">Be the first to know when we launch.</p>
        <Button onClick={handleClick}>Request an invite</Button>
      </main>
      <Modal
        title={success ? "All done!" : "Request an invite"}
        open={showModal}
        onClose={handleModalClose}
        onCloseFinish={handleModalCloseFinish}
      >
        {success ? (
          <InviteSuccess onConfirm={handleModalClose} />
        ) : (
          <SignupForm onSuccess={handleFormSuccess} />
        )}
      </Modal>
    </>
  );
}

export default MainContent;
