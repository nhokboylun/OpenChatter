"use client";
import { useState } from "react";
import Button from "./components/UI/Button";
import Posts from "./components/posts/Posts";
import { fetchPosts } from "./components/services/FetchApi";

function Homepage() {
  const [isOrderByNewest, setIsOderByNewest] = useState(true);
  const [flags, setFlags] = useState("");

  return (
    <div className="w-[90%] my-10 mx-auto flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 text-xs sm:text-lg justify-between items-center">
        <div className="flex gap-2 font-[500] items-center">
          <p>Order By:</p>
          <Button
            className={`${
              isOrderByNewest &&
              "bg-blue-400 dark:bg-red-500 dark:hover:bg-red-400"
            }`}
            onClick={() => setIsOderByNewest(true)}
            type="md"
          >
            Newest
          </Button>
          <Button
            className={`${
              !isOrderByNewest &&
              "bg-blue-400 dark:bg-red-500 dark:hover:bg-red-400"
            }`}
            onClick={() => setIsOderByNewest(false)}
            type="md"
          >
            Most Popular
          </Button>
        </div>

        <div className="flex gap-2 font-[500] items-center">
          <p>Filter By:</p>
          <select
            className="rounded-sm font-[500]"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
          >
            <option value="">Select</option>
            <option value="question">Question</option>
            <option value="opinion">Opinion</option>
          </select>
        </div>
      </div>

      <Posts
        isOrderByNewest={isOrderByNewest}
        flags={flags}
        queryKey={["posts"]}
        queryFn={fetchPosts}
      />
    </div>
  );
}

export default Homepage;
