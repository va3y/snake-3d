import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import Button from "./Button";

interface ModalProps {
  titleText: string;
  onClose?: () => void;
}

// Quick and dirty copypaste from https://headlessui.dev/react/dialog
const Modal: React.FC<ModalProps> = (props) => {
  let completeButtonRef = useRef(null);
  return (
    <Transition show={true} appear as={Fragment}>
      <Dialog
        initialFocus={completeButtonRef}
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={props.onClose || (() => ({}))}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title as="h3" className="text-2xl font-medium leading-6 text-gray-900">
                {props.titleText}
              </Dialog.Title>
              <div className="mt-2" ref={completeButtonRef}>
                {props.children}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
