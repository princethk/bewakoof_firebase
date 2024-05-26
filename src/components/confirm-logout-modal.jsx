import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useModal } from "../hooks/use-modal";
import useAuth from "../hooks/use-auth";

/**
 * LogoutConfirmationModal component displays a dialog to confirm user logout.
 * @returns {JSX.Element} The JSX element representing the logout confirmation modal.
 */
export default function LogoutConfirmationModal() {
  const { closeModal, isOpen } = useModal();
  const { logout } = useAuth();

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        className="fixed inset-0 z-[500000] flex items-center justify-center bg-zinc-900 bg-opacity-70 px-6"
        onClose={() => closeModal()}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </TransitionChild>

        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <DialogPanel className="bg-white rounded-lg p-6 w-full max-w-lg mx-auto">
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
              <DialogTitle className="ml-2 text-lg font-semibold text-gray-900">
                Logout
              </DialogTitle>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600 text-center">
                Are you sure you want to log out?
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="mr-4 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={async () => {
                  await logout();
                  closeModal();
                }}
              >
                Logout
              </button>
              <button
                type="button"
                className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                onClick={() => closeModal()}
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
