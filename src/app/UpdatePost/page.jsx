import UpdatePost from "./UpdatePost";

export const metadata = {
  title: "Update Post",
  description: "View, manage, update your posts here.",
  robots: "noindex, nofollow",
};

function Layout() {
  return (
    <>
      <UpdatePost />
    </>
  );
}

export default Layout;
