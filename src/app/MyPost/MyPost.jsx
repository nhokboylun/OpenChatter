"use client";
import Posts from "../components/posts/Posts";
import { useUser } from "../components/contexts/userContext";
import { fetchMyComments, fetchMyPosts } from "../components/services/FetchApi";
import MyComments from "../components/home/MyComments";

function MyPost() {
  const { userId } = useUser();

  return (
    <>
      <div className="w-[90%] my-10 mx-auto flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="text-4xl font-bold">My Posts</div>
          {userId && (
            <Posts
              queryKey={["myPosts"]}
              queryFn={() => fetchMyPosts(userId)}
            />
          )}
        </div>

        <div className="flex flex-col gap-4 mt-16">
          <div className="text-4xl font-bold">My Comments</div>
          {userId && (
            <MyComments
              queryKey={["myComments"]}
              queryFn={() => fetchMyComments(userId)}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default MyPost;
