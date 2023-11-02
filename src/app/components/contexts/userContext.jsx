"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { checkId, createUser } from "../services/FetchApi";

const UserContext = createContext();

function UserProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const generateUniqueId = useCallback(async () => {
    let tempId = generateRandom6DigitID();
    const user = await checkId(tempId);
    if (user.length === 0) {
      setUserId(tempId);
      createUser(tempId);
      localStorage.setItem("id", tempId);
    } else {
      generateUniqueId(); // Call the function recursively until a unique ID is found
    }
  }, []); // Dependencies array is empty which means this function is created once per component lifecycle

  useEffect(() => {
    // This will only be executed on the client-side
    const localId = localStorage.getItem("id");
    if (localId) {
      setUserId(localId);
    } else {
      generateUniqueId();
    }
  }, [generateUniqueId]);

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
