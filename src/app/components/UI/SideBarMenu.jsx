import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
import NavLinks from "./NavLinks";
import ThemeSwitcher from "./ThemeSwitcher";

function SideBarMenu({ userId, isMenuOpen, toggleMenu }) {
  return (
    <Transition.Root show={isMenuOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={toggleMenu}>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="xl:hidden fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="fixed inset-0 bg-black bg-opacity-25"
                aria-hidden="true"
                onClick={toggleMenu}
              />
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-[75%]">
                <div className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white dark:bg-gray-800 shadow-xl">
                    <div className="flex items-center justify-between px-4 py-6 sm:px-6">
                      <div className="lg:hidden relative flex justify-center items-center">
                        <UserIcon className="w-6 h-6 hover:text-blue-400 transform duration-300 text-gray-500" />
                        <span className="ml-1 font-semibold"> {userId}</span>
                      </div>

                      <ThemeSwitcher responsive={"lg:hidden"} />

                      <XMarkIcon
                        className="h-6 w-6 cursor-pointer"
                        onClick={toggleMenu}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <NavLinks className={"flex flex-col"} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}

export default SideBarMenu;
