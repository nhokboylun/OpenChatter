import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import user from "../../img/user.png";
import { calcCommentAge } from "../services/Helper";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";

function MyComments({ queryKey, queryFn }) {
  const { data: comments } = useQuery({
    queryKey,
    queryFn,
  });

  return (
    <>
      {comments?.map((comment) => (
        <Link
          href={`/${comment.post_id}`}
          key={comment.comment_id}
          className="flex px-4 py-6 gap-2 bg-white hover:bg-gray-200 duration-300 transition rounded-lg shadow-md items-center"
        >
          <Image
            className="rounded-full"
            width={40}
            height={40}
            src={user}
            alt="anonymous"
          />

          <p className="rounded-2xl relative text-xl px-2 py-1 bg-gray-200">
            {comment.content}
          </p>

          <p>{calcCommentAge(comment.created_at)}</p>
          <div className="flex ">
            <HandThumbUpIcon className="w-6 h-6 text-blue-400" />
            <span>{comment.upvote}</span>
          </div>
        </Link>
      ))}
    </>
  );
}

export default MyComments;
