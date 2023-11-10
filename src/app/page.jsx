import Homepage from "./Hompage";

export const metadata = {
  title: "OpenChatter",
  description:
    "OpenChatter provide you a anonymous forum where you can post, comment, share anything without being identified.",
  alternates: {
    canonical: "https://openchatter.netlify.app/",
  },
};

async function Page() {
  return <Homepage />;
}

export default Page;
