"use client";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "../contexts/userContext";
import { useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import SideBarMenu from "./SideBarMenu";
import NavLinks from "./NavLinks";

function NavBar() {
  const pathName = usePathname();

  const { userId, setSearchQuery } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full bg-sky-300 dark:bg-gray-700 dark:text-white">
      <div
        className={`${
          pathName === "/" ? "text-md sm:text-2xl" : "text-3xl"
        } h-[75px] flex items-center justify-between w-[90%] mx-auto`}
      >
        <Link
          href="/"
          className="font-bold cursor-pointer transition-colors duration-200"
        >
          Open
          <span className="font-extrabold text-blue-600">Chatter</span>
        </Link>
        <div className="relative flex justify-center items-center">
          <UserIcon
            onClick={toggleModal}
            className="w-6 h-6 hidden lg:block hover:text-blue-400 transform duration-300 text-gray-500 cursor-pointer"
          />
          {showModal && (
            <div className="absolute transform top-0 mt-7 w-[200px] text-center py-2 dark:text-gray-700 bg-white rounded-xl shadow-xl">
              User ID: {userId}
            </div>
          )}
        </div>
        {pathName === "/" && (
          <div className="relative w-[175px] sm:w-[500px]">
            <input
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-1 w-full rounded-full light:hover:bg-gray-100 focus:ring-2 focus:ring-blue-600 transition duration-500 pl-10 focus:outline-none focus:ring-offset-2 dark:placeholder:text-gray-400 dark:text-gray-200"
              placeholder="Search by title"
            />

            <MagnifyingGlassIcon className="w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-2 text-gray-500 dark:text-gray-400" />
          </div>
        )}
        <ThemeSwitcher responsive={"lg:flex hidden"} />
        <NavLinks className={"hidden xl:flex justify-center items-center"} />

        <Bars3Icon onClick={toggleMenu} className="w-6 h-6 xl:hidden" />
      </div>

      <SideBarMenu
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        userId={userId}
      />
    </nav>
  );
}

export default NavBar;
