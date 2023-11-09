import Homepage from "./Hompage";
import { useUser } from "./components/contexts/userContext";
import { fetchPosts } from "./components/services/FetchApi";

export const metadata = {
  title: "OpenChatter",
  description:
    "OpenChatter provide you a anonymous forum where you can post, comment, share anything without being identified.",
  alternates: {
    canonical: "https://openchatter.netlify.app/",
  },
};

async function Page() {
  const data = await fetchPosts();

  return <Homepage initialData={data} />;
}

export default Page;
