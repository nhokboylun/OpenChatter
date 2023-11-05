import { fetchPostById } from "../components/services/FetchApi";
import PostDetail from "./PostDetail";

export async function generateMetadata({ params }) {
  const { post } = await fetchPostById(params.postId);
  console.log(post);
  return {
    title: `${post.title}`,
    description: `${post.content}`,
    alternative: { canonical: `/${post.post_id}` },
  };
}

function Layout({ params }) {
  return (
    <>
      <PostDetail params={params} />
    </>
  );
}

export default Layout;
