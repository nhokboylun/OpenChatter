/* eslint-disable @next/next/no-img-element */
"use client";
import Loader from "../components/UI/Loader";
import { useQuery } from "@tanstack/react-query";
import { fetchPostById } from "../components/services/FetchApi";
import PostInfo from "../components/posts/PostInfo";
import PostManipulation from "../components/posts/PostManipulation";
import { useState } from "react";
import Modal from "../components/UI/Modal";
import Error from "../components/UI/Error";
import Comments from "../components/comments/Comments";
import { getFileExtension } from "../components/services/Helper";
import { ShareIcon } from "@heroicons/react/24/outline";
import Button from "../components/UI/Button";
import ConfirmModal from "../components/UI/ConfirmModal";
import Link from "next/link";

function PostDetail({ params, initialData }) {
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts", params.postId],
    queryFn: ({ queryKey }) => {
      const [, postId] = queryKey;
      return fetchPostById(postId);
    },
    initialData,
  });

  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  function handleEdit() {
    setShowModal(true);
    setIsDelete(false);
  }

  function handleDelete() {
    setShowModal(true);
    setIsDelete(true);
  }

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !posts.post) {
    return <Error error={error} />;
  }

  let url;
  let isVideo;
  if (posts.post.image_name !== "") {
    url = `https://jnryovwodhapsbzdnhnu.supabase.co/storage/v1/object/public/image/${posts.post.user_id}/${posts.post.image_name}`;
    isVideo = getFileExtension(url)?.toLowerCase() === "mp4";
  } else if (posts.post.url !== "") {
    url = posts.post.url;
    isVideo = getFileExtension(url)?.toLowerCase() === "mp4";
  } else {
    url = null;
  }

  return (
    <div className="bg-white flex flex-col mt-8 w-[90%] gap-4 mx-auto px-4 py-6 relative">
      {(showModal || showConfirmModal) && (
        <div className="fixed inset-0 z-40 backdrop-blur-sm bg-opacity-50"></div>
      )}

      {showModal && (
        <Modal
          postId={params.postId}
          secretKey={posts.post.secret_key}
          isDelete={isDelete}
          setShowModal={setShowModal}
        />
      )}

      <Button
        onClick={() => setShowConfirmModal(true)}
        type="sm"
        className="absolute top-4 right-5 "
      >
        <ShareIcon className="w-6 h-6" />
      </Button>

      {showConfirmModal && (
        <ConfirmModal
          setShowConfirmModal={setShowConfirmModal}
          postId={params.postId}
        />
      )}

      <PostInfo post={posts.post} />

      {url !== null &&
        (isVideo ? (
          <video className="w-full h-[500px]" controls>
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <>
            {url.includes("https://api.apiflash.com/") ? (
              <Link href={`/${posts.post.share_from_post_id}`}>
                {" "}
                <img
                  src={url}
                  alt={posts.post.title}
                  className="w-full h-auto"
                />
              </Link>
            ) : (
              <img src={url} alt={posts.post.title} className="w-full h-auto" />
            )}
          </>
        ))}

      <PostManipulation
        post={posts.post}
        postId={params.postId}
        postOwnerId={posts.post.user_id}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />

      <Comments comments={posts.comments} postId={params.postId} />
    </div>
  );
}

export default PostDetail;
