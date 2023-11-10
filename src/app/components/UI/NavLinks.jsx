import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLinks({ className }) {
  const pathName = usePathname();
  const navStyles =
    "hover:text-blue-400 font-semibold p-2 m-1 rounded transition duration-300 text-2xl sm:text-3xl xl:text-xl";

  return (
    <ul className={className}>
      <Link
        href="/MyPost"
        className={`${
          pathName === "/MyPost" &&
          "bg-blue-400 dark:bg-blue-700 dark:hover:text-blue-700"
        } ${navStyles}`}
      >
        Home
      </Link>
      <Link
        href="/"
        className={`${
          pathName === "/" &&
          "bg-blue-400 dark:bg-blue-700 dark:hover:text-blue-700"
        } ${navStyles}`}
      >
        Forum
      </Link>
      <Link
        href="/CreatePost"
        className={` ${
          pathName === "/CreatePost" &&
          "bg-blue-400 dark:bg-blue-700 dark:hover:text-blue-700"
        } ${navStyles}`}
      >
        Create Post
      </Link>
    </ul>
  );
}

export default NavLinks;
