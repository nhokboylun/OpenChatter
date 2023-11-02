"use client";
import { MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/outline";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "../contexts/userContext";
import { useState } from "react";

function NavBar() {
  const pathName = usePathname();
  const navStyles =
    "hover:text-blue-400 font-semibold p-2 m-1 rounded transition duration-300";

  const { userId, setSearchQuery } = useUser();

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <nav className="w-full bg-yellow-100">
      <div className="text-2xl h-[75px] flex items-center justify-between w-[90%] mx-auto">
        <Link
          href="/"
          className="font-bold cursor-pointer transition-colors duration-200"
        >
          Open
          <span className="font-extrabold text-blue-900">Chatter</span>
        </Link>

        <div className="relative flex justify-center items-center">
          <UserIcon
            onClick={toggleModal}
            className="w-6 h-6 hover:text-blue-400 transform duration-300 text-gray-500 cursor-pointer"
          />
          {showModal && (
            <div className="absolute transform top-0 mt-7 w-[200px] text-center py-2 bg-white rounded-xl shadow-xl">
              User ID: {userId}
            </div>
          )}
        </div>

        {pathName === "/" && (
          <div className="relative w-[500px]">
            <input
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-1 w-full rounded-full hover:bg-gray-100 focus:ring-2 focus:ring-blue-600 transition duration-300 pl-10 focus:outline-none focus:ring-offset-2"
              placeholder="Search by title"
            />

            <MagnifyingGlassIcon className="w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-2 text-gray-500" />
          </div>
        )}

        <ul className="flex justify-center items-center">
          <Link
            href="/MyPost"
            className={`${
              pathName === "/MyPost" && "bg-blue-400"
            } ${navStyles}`}
          >
            Home
          </Link>
          <Link
            href="/"
            className={`${pathName === "/" && "bg-blue-400"} ${navStyles}`}
          >
            Forum
          </Link>
          <Link
            href="/CreatePost"
            className={` ${
              pathName === "/CreatePost" && "bg-blue-400"
            } ${navStyles}`}
          >
            Create Post
          </Link>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
