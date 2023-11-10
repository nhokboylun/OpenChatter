import Image from "next/image";
import user from "../../img/user.png";
import {
  EllipsisVerticalIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { calcCommentAge } from "../services/Helper";
import { queryClient } from "@/app/TanstackProvider";
import toast from "react-hot-toast";
import {
  deleteComment,
  editComment,
  updateVoteComment,
} from "../services/FetchApi";
import CommentForm from "./CommentForm";

function DisplayComment({ comment, index, lastIndex, userId, postId }) {
  const [activeModalCommentId, setActiveModalCommentId] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [isEditting, setIsEditting] = useState(0);
  const timerId = useRef(null);

  const { mutate: mutateUpvote } = useMutation({
    mutationFn: ({ commentId, totalUpvote }) =>
      updateVoteComment(commentId, totalUpvote),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", postId]);
    },
    onError: (error) => {
      toast.error("Error on update comment vote:", error);
    },
  });

  const { mutate: mutateEditComment } = useMutation({
    mutationFn: (newContent) => editComment(isEditting, newContent),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", postId]);
      toast.success("Edit comment successfully");
    },
    onError: (error) => {
      toast.error("Error on edit comment:", error);
    },
  });

  const { mutate: mutateDeleteComment } = useMutation({
    mutationFn: (id) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", postId]);
      toast.success("Delete comment successfully");
    },
    onError: (error) => {
      toast.error("Error on delete comment:", error);
    },
  });

  function handleLike(commentId, upvote) {
    if (timerId.current) clearTimeout(timerId.current);

    setClickCount(clickCount + 1);

    timerId.current = setTimeout(() => {
      const totalUpvote = Number(upvote) + clickCount + 1;
      mutateUpvote({ commentId, totalUpvote });
      setClickCount(0);
    }, 500);
  }

  function toggleModal(commentId) {
    if (activeModalCommentId === commentId) {
      setActiveModalCommentId(null);
    } else {
      setActiveModalCommentId(commentId);
    }
  }

  return (
    <div
      className={`flex gap-2 ${
        index === lastIndex ? "border-b border-gray-400 pb-10" : ""
      }`}
    >
      <Image
        className="rounded-full h-[50px]"
        width={50}
        height={50}
        src={user}
        alt="anonymous"
      />

      <div
        className={`rounded-2xl relative text-xl px-2 py-1 bg-gray-200 dark:bg-gray-500 ${
          isEditting == comment.comment_id && "w-full"
        }`}
      >
        <p className="font-semibold">{comment.user_id}</p>

        {isEditting == comment.comment_id ? (
          <CommentForm
            mutate={mutateEditComment}
            initialComment={comment.content}
            setIsEditting={setIsEditting}
          />
        ) : (
          <p>{comment.content}</p>
        )}

        <div className="absolute flex gap-2 mt-1 text-sm opacity-50 w-[150px]">
          <p>{calcCommentAge(comment.created_at)}</p>
          <button
            onClick={() => handleLike(comment.comment_id, comment.upvote)}
            className="cursor-pointer hover:text-blue-700 dark:hover:text-blue-500 underline underline-offset-1"
          >
            Like
          </button>
          <div className="flex">
            <HandThumbUpIcon className="w-5 h-5 text-blue-700" />
            <span>{comment.upvote}</span>
          </div>
        </div>
      </div>

      {comment.user_id == userId && (
        <div
          onClick={() => toggleModal(comment.comment_id)}
          className="transition duration-300 rounded-full self-center hover:bg-gray-400 cursor-pointer"
        >
          <EllipsisVerticalIcon className="w-6 h-6" />
          {activeModalCommentId === comment.comment_id && (
            <div className="flex flex-col absolute z-50 bg-white dark:bg-gray-900 dark:text-white rounded-lg shadow-xl">
              <button
                onClick={() => setIsEditting(activeModalCommentId)}
                className="hover:bg-blue-400 transition duration-300 p-2 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => mutateDeleteComment(comment.comment_id)}
                className="hover:bg-blue-400 transition duration-300 p-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DisplayComment;
