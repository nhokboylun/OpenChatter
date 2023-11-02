import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Loader from "../UI/Loader";
import Error from "../UI/Error";
import React, { useEffect, useState } from "react";
import PostInfo from "./PostInfo";
import { useUser } from "../contexts/userContext";

function Posts({ isOrderByNewest, flags, queryKey, queryFn }) {
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey,
    queryFn,
  });
  const [postsOptimize, setPostsOptimize] = useState([]);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const { searchQuery } = useUser();

  useEffect(() => {
    if (posts) {
      setIsOptimizing(true);

      const reduced = posts.reduce(
        (acc, post) => {
          // Check search query (only if provided)
          const matchesSearchQuery =
            searchQuery === "" ||
            post.title.toLowerCase().includes(searchQuery.toLowerCase());

          // Check flags (only if provided)
          const matchesFlags = flags === "" || post.type === flags;

          // Add to respective buckets
          if (matchesSearchQuery && matchesFlags) {
            acc.matchingPosts.push(post);
          }

          return acc;
        },
        { matchingPosts: [] } // initial accumulator
      );

      let displayPosts = reduced.matchingPosts;

      if (isOrderByNewest) {
        displayPosts.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      } else {
        displayPosts.sort((a, b) => Number(b.upvote) - Number(a.upvote));
      }

      setPostsOptimize(displayPosts);
      setIsOptimizing(false);
    }
  }, [isOrderByNewest, flags, searchQuery, posts]);

  if (isError) {
    return <Error error={error} />;
  }

  // For Home page
  if (!isOrderByNewest && posts) {
    return posts.map((post) => (
      <Link
        key={post.post_id}
        className="bg-white shadow-md px-4 py-6 flex flex-col gap-3"
        href={"/" + post.post_id}
      >
        <PostInfo post={post} />
        <p className="text-md text-gray-400 font-semibold">
          {post.upvote}
          {post.upvote > 1 ? ` upvotes` : ` upvote`}
        </p>
      </Link>
    ));
  }

  // For forum page
  return (
    <div className="w-full flex flex-col gap-4">
      {(isOptimizing || isLoading) && <Loader />}
      {postsOptimize.map((post) => (
        <Link
          key={post.post_id}
          className="bg-white shadow-md px-4 py-6 flex flex-col gap-3"
          href={"/" + post.post_id}
        >
          <PostInfo post={post} />
          <p className="text-md text-gray-400 font-semibold">
            {post.upvote}
            {post.upvote > 1 ? ` upvotes` : ` upvote`}
          </p>
        </Link>
      ))}
    </div>
  );
}

export default Posts;
