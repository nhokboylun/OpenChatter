import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function CommentForm({ mutate, initialComment, setIsEditting }) {
  const [commentText, setCommentText] = useState(initialComment);

  async function handleCommentSubmit(e) {
    e.preventDefault();
    await mutate(commentText);
    setCommentText(initialComment);
    if (setIsEditting) {
      setIsEditting(0);
    }
  }
  return (
    <form
      onSubmit={handleCommentSubmit}
      className="bg-white flex justify-between relative rounded-2xl w-full border"
    >
      <textarea
        className="px-2 w-full pr-10 text-xl rounded-2xl"
        type="text"
        placeholder="Leave a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />

      <button
        style={{
          position: "absolute",
          right: "5px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
        type="submit"
        className="hover:text-blue-400 duration-300 transition"
      >
        <PaperAirplaneIcon className="w-6 h-6" />
      </button>
    </form>
  );
}

export default CommentForm;
