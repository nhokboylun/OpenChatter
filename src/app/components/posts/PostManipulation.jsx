import {
  HandThumbUpIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Button from "../UI/Button";
import { useRef, useState } from "react";
import { updatePostUpVote } from "../services/FetchApi";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/app/TanstackProvider";
import { useUser } from "../contexts/userContext";

function PostManipulation({
  post,
  postId,
  postOwnerId,
  handleDelete,
  handleEdit,
}) {
  const [vote, setVote] = useState(Number(post.upvote));

  const timerId = useRef(null);

  const { mutate } = useMutation({
    mutationFn: (newVoteCount) => updatePostUpVote(postId, newVoteCount),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", postId]);
    },
    onError: (error) => {
      console.error("Error updating post upvote:", error);
    },
  });

  function handleUpvote() {
    if (timerId.current) clearTimeout(timerId.current);
    setVote((prevVote) => prevVote + 1);

    timerId.current = setTimeout(function () {
      mutate(vote + 1);
    }, 500);
  }

  const { userId } = useUser();
  const isPostOwner = userId == postOwnerId;

  return (
    <div className="flex justify-between">
      <Button onClick={handleUpvote} type="sm" className="w-16 ml-2">
        {vote}
        <HandThumbUpIcon className="w-6 h-6" />
      </Button>

      {isPostOwner && (
        <div className="flex gap-2">
          <Button onClick={handleEdit} type="sm">
            <PencilSquareIcon className="w-6 h-6" />
          </Button>
          <Button onClick={handleDelete} type="sm">
            <TrashIcon className="w-6 h-6" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default PostManipulation;
