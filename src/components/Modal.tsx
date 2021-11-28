import { Fragment, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

type Props = {
  title: string;
  open: boolean;
  onClose(): void;
  onCloseFinish?: () => void;
  children: ReactNode;
};

function Modal({ title, open, onClose, onCloseFinish, children }: Props) {
  return (
    <Transition show={open} as={Fragment} afterLeave={onCloseFinish}>
      <Dialog open={open} onClose={onClose} className="fixed inset-0 z-10">
        <div className="flex items-center justify-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-in"
            enterFrom="opacity-0"
            enterTo="opacity-30"
            entered="opacity-30"
            leave="transition-opacity ease-out"
            leaveFrom="opacity-30"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              className="fixed inset-0 bg-black"
              data-testid="modal-bg"
            />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-out duration-300"
            enterFrom="-translate-y-full opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transition ease-in duration-300"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="-translate-y-full opacity-0"
          >
            <div className="transform-gpu flex flex-col items-center relative bg-white max-w-md m-auto p-8">
              <button
                type="button"
                className="absolute top-4 right-4 h-6 w-6 text-gray-300"
                onClick={onClose}
                aria-label="Close"
              >
                <XIcon />
              </button>
              <Dialog.Title as="h2" className="pb-8 text-center">
                {title}
              </Dialog.Title>

              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

Modal.defaultProps = {
  onCloseFinish() {},
};

export default Modal;
