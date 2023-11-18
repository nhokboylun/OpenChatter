import { usePathname } from "next/navigation";
import { calcPostAge, displayShortContent } from "../services/Helper";

function PostInfo({ post }) {
  const path = usePathname();
  const style = "dark:text-gray-400 text-md text-gray-400 font-semibold";
  return (
    <>
      <p className={style}>{calcPostAge(post.created_at)}</p>
      <p className="font-bold text-xl">{post.title}</p>
      <p className={style}>
        {path === "/" ? displayShortContent(post.content) : post.content}
      </p>
    </>
  );
}

export default PostInfo;
