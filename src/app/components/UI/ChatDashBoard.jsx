import Image from "next/image";
import userAvatar from "../../img/user.png";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { getAllUsers } from "../services/FetchApi";
import { useEffect, useState } from "react";
import Loader from "./Loader";

function ChatDashBoard({ setChatWithId, chatWithId, userId }) {
  const [allUsers, setAllUsers] = useState([]);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [filter, setFilter] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoadingUser(true);
        const users = await getAllUsers();
        setAllUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchUsers();
  }, []);

  let filteredUsers;

  if (showModal == false) {
    filteredUsers = allUsers;
  } else {
    filteredUsers = allUsers.filter((user) =>
      user.user_id.toString().includes(filter)
    );
  }

  function handleOpenChat(openWithUserId) {
    setChatWithId(openWithUserId);
    setShowModal(false);
  }
  return (
    <div className="bg-gray-800 rounded-l-2xl w-[30%] p-4 flex flex-col gap-4 overflow-y-auto max-h-screen">
      {isLoadingUser ? (
        <Loader />
      ) : (
        <>
          <div className="flex items-center border-b-gray-700 pb-4 border-b-[0.5px]">
            <Image
              className="rounded-full"
              width={60}
              height={60}
              src={userAvatar}
              alt="anonymous"
            />
            <p className="font-bold ml-4 text-2xl flex-grow">{userId}</p>
            <PencilSquareIcon
              onClick={() => setShowModal(!showModal)}
              className="text-white hover:text-blue-500 duration-300 transition w-12 h-12 rounded-full bg-gray-700 p-2 cursor-pointer"
            />
          </div>

          {showModal && (
            <input
              className="bg-gray-700 rounded-full p-4"
              placeholder="Chat with userId"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            ></input>
          )}

          {filteredUsers.map((user, index) => (
            <div
              onClick={() => handleOpenChat(user.user_id)}
              className={`${
                chatWithId == user.user_id && "bg-gray-700"
              } hover:bg-gray-700 flex items-center rounded-2xl p-2`}
              key={index}
            >
              <Image
                className="rounded-full"
                width={40}
                height={40}
                src={userAvatar}
                alt="anonymous"
              />
              <p className="font-semibold ml-2">{user.user_id}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default ChatDashBoard;
