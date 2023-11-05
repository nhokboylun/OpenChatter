import MyPost from "./MyPost";

export const metadata = {
  title: "My Post",
  description: "View and manage your posts and comments on openchatter.",
  robots: "noindex, nofollow",
};

function Layout() {
  return (
    <>
      <MyPost />
    </>
  );
}

export default Layout;
