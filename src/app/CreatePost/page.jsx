import CreatePost from "./CreatePost";

export const metadata = {
  title: "Create Post",
  description:
    "Create a new post on OpenChatter and share your thoughts with the community.",
  robots: "noindex, nofollow",
};

function Layout() {
  return (
    <>
      <CreatePost />
    </>
  );
}

export default Layout;
