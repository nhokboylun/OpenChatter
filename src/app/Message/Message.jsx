"use client";

import { useState } from "react";
import ChatDashBoard from "../components/UI/ChatDashBoard";
import ChatMain from "../components/UI/ChatMain";
import Image from "next/image";
import userAvatar from "../img/user.png";
import { useUser } from "../components/contexts/userContext";

function Message() {
  const [chatWithId, setChatWithId] = useState();
  const { userId } = useUser();

  return (
    <div className="text-white w-[90%] my-8 mx-auto flex min-h-screen">
      <ChatDashBoard
        userId={userId}
        setChatWithId={setChatWithId}
        chatWithId={chatWithId}
      />

      <div className="w-[70%] flex flex-col bg-gray-700 rounded-r-2xl">
        {chatWithId ? (
          <>
            <div className="bg-gray-600 rounded-tr-2xl px-4 py-2 flex items-center">
              <Image
                className="rounded-full"
                width={50}
                height={50}
                src={userAvatar}
                alt="anonymous"
              />
              <p className="font-bold ml-4 text-2xl flex-grow">{chatWithId}</p>
            </div>

            <ChatMain userId={userId} chatWithId={chatWithId} />
          </>
        ) : (
          <p className="text-center font-semibold text-4xl mt-16">
            {" "}
            Select one user to chat with
          </p>
        )}
      </div>
    </div>
  );
}

export default Message;
