"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { checkId, createUser } from "../services/FetchApi";

const UserContext = createContext();

function UserProvider({ children }) {
  const [userId, setUserId] = useState(localStorage.getItem("id"));
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function generateUniqueId() {
      while (!userId) {
        let tempId = generateRandom6DigitID();
        const user = await checkId(tempId);
        if (user.length === 0) {
          setUserId(tempId);
          createUser(tempId);
          localStorage.setItem("id", tempId);
          break; // Exit loop when a unique ID is found
        }
      }
    }
    if (userId === null) {
      generateUniqueId();
    }
  }, [userId]);

  return (
    <UserContext.Provider value={{ userId, searchQuery, setSearchQuery }}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("UserContext was used outside the UserProvider");
  return context;
}

function generateRandom6DigitID() {
  // Generate a random number between 100,000 and 999,999
  return Math.floor(100000 + Math.random() * 900000);
}

export { UserProvider, useUser };
