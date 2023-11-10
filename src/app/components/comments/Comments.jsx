import Image from "next/image";
import user from "../../img/user.png";
import { queryClient } from "@/app/TanstackProvider";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "../contexts/userContext";
import { createComment } from "../services/FetchApi";
import toast from "react-hot-toast";
import DisplayComment from "./DisplayComment";
import CommentForm from "./CommentForm";

function Comments({ comments, postId }) {
  const { userId } = useUser();

  const { mutate } = useMutation({
    mutationFn: (content) => createComment(postId, userId, content),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", postId]);
      toast.success("Comment successfully");
    },
    onError: (error) => {
      toast.error("Error on comment:", error);
    },
  });

  return (
    <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 flex flex-col gap-8 rounded-xl">
      {comments.map((comment, index) => (
        <DisplayComment
          comment={comment}
          index={index}
          key={comment.comment_id}
          lastIndex={comments.length - 1}
          userId={userId}
          postId={postId}
        />
      ))}

      <div className="flex gap-2 items-center justify-center">
        <Image
          className="rounded-full"
          width={40}
          height={40}
          src={user}
          alt="anonymous"
        />

        <CommentForm initialComment={""} mutate={mutate} />
      </div>
    </div>
  );
}

export default Comments;
