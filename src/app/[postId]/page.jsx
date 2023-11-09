import { fetchPostById } from "../components/services/FetchApi";
import PostDetail from "./PostDetail";

export async function generateMetadata({ params }) {
  const { post } = await fetchPostById(params.postId);
  return {
    title: `${post.title}`,
    description: `${post.content}`,
    alternative: { canonical: `/${post.post_id}` },
  };
}

async function Layout({ params }) {
  const data = await fetchPostById(params.postId);

  return (
    <>
      <PostDetail params={params} initialData={data} />
    </>
  );
}

export default Layout;
