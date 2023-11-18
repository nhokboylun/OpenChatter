import { useEffect, useState } from "react";
import {
  getMessageBetweenTwoIds,
  sendMessage,
  subscribeToConversation,
} from "../services/FetchApi";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Loader from "./Loader";
import Image from "next/image";
import userAvatar from "../../img/user.png";

function ChatMain({ chatWithId, userId }) {
  const [messages, setMessages] = useState([]);
  const [isLoadingMessage, setIsLoadingMessage] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSendMessage() {
    setIsLoadingMessage(true);
    await sendMessage(message, userId, chatWithId);
    setIsLoadingMessage(false);
    setMessage("");
  }

  useEffect(() => {
    const fetchHistoryMessage = async () => {
      try {
        setIsLoadingMessage(true);
        const fetchedMessages = await getMessageBetweenTwoIds(
          userId,
          chatWithId
        );
        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Error fetching history messages:", error);
      } finally {
        setIsLoadingMessage(false);
      }
    };

    if (chatWithId) {
      fetchHistoryMessage();
    }
  }, [chatWithId, userId]);

  useEffect(() => {
    let unsubscribe = () => {};

    if (chatWithId && userId) {
      unsubscribe = subscribeToConversation(userId, chatWithId, setMessages);
    }

    // Clear messages when changing the conversation
    return () => {
      setMessages([]);
      unsubscribe();
    };
  }, [chatWithId, userId]);

  return (
    <>
      <div className="bg-gray-700 flex flex-col-reverse py-2 overflow-y-auto max-h-screen gap-4 flex-grow">
        {isLoadingMessage && <Loader />}
        {messages.map((message) =>
          message.sender_id == userId ? (
            <p
              key={message.message_id}
              className="bg-blue-500 p-2 mx-2 self-end rounded-tr-3xl rounded-tl-3xl rounded-bl-3xl"
            >
              {message.content}
            </p>
          ) : (
            <div key={message.message_id} className="flex items-center px-6">
              <Image
                className="rounded-full"
                width={40}
                height={40}
                src={userAvatar}
                alt="anonymous"
              />

              <p className="bg-gray-800 max-w-[70%] rounded-tr-3xl rounded-tl-3xl rounded-br-3xl p-2 mx-2 self-start">
                {message.content}
              </p>
            </div>
          )
        )}
      </div>

      <div className="bg-gray-600 justify-self-end rounded-br-2xl px-4 py-2 flex items-center">
        <div className="bg-white my-2 flex justify-between relative rounded-2xl w-full border">
          <input
            className="text-black dark:text-white px-4 py-2 w-full pr-10 text-xl rounded-2xl"
            type="text"
            placeholder="Send a message"
            value={message}
            disabled={isLoadingMessage}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            style={{
              position: "absolute",
              right: "5px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
            onClick={handleSendMessage}
            disabled={isLoadingMessage}
            className="hover:text-blue-400 duration-300 transition"
          >
            <PaperAirplaneIcon className="text-black dark:text-white dark:hover:text-blue-500 hover:text-blue-500 w-6 h-6 duration-300 transition" />
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatMain;
