import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Loader from "../UI/Loader";
import Error from "../UI/Error";
import React, { useEffect, useState } from "react";
import PostInfo from "./PostInfo";
import { useUser } from "../contexts/userContext";
import { LinkIcon } from "@heroicons/react/24/outline";

function Posts({ isOrderByNewest, flags, queryKey, queryFn, initialData }) {
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey,
    queryFn,
    initialData,
  });
  const [postsOptimize, setPostsOptimize] = useState([]);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const { searchQuery } = useUser();

  useEffect(() => {
    if (posts && queryKey[0] == "posts") {
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
  }, [isOrderByNewest, flags, searchQuery, posts, queryKey]);

  if (isError) {
    return <Error error={error} />;
  }

  if (isOptimizing || isLoading) return <Loader />;

  function renderPosts(postList) {
    return postList.map((post) => (
      <Link
        key={post.post_id}
        className={`${
          post.share_from_post_id
            ? "bg-blue-100 hover:bg-blue-200"
            : "bg-white hover:bg-gray-200"
        } duration-300 transform shadow-md px-4 py-6 flex flex-col gap-3 relative rounded-sm`}
        href={`/${post.post_id}`}
      >
        {post.share_from_post_id && (
          <LinkIcon className="w-6 h-6 absolute top-2 right-4" />
        )}

        <PostInfo post={post} />

        <p className="text-md text-gray-400 font-semibold">
          {post.upvote} {post.upvote > 1 ? `upvotes` : `upvote`}
        </p>
      </Link>
    ));
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {renderPosts(queryKey[0] === "myPosts" ? posts : postsOptimize)}
    </div>
  );
}

export default Posts;
