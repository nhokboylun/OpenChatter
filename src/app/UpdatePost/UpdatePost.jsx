"use client";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Error from "../components/UI/Error";
import { useSearchParams } from "next/navigation";
import PostForm from "../components/posts/PostForm";
import { updatePost } from "../components/services/FetchApi";
import { useRouter } from "next/navigation";
import Loader from "../components/UI/Loader";
import { queryClient } from "../TanstackProvider";
import toast from "react-hot-toast";

function UpdatePost() {
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");
  const data = queryClient.getQueryData(["posts", postId])?.post;

  const router = useRouter();
  const userId = data?.user_id;

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (formData) => updatePost({ ...formData, userId, postId }),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", postId]);
      toast.success("Updating post successfully");
      router.push(`/${postId}`);
    },
    onError: (error) => {
      toast.error("Error updating post upvote:", error);
    },
  });

  const imageUrl =
    data?.image_name.length > 0
      ? `https://jnryovwodhapsbzdnhnu.supabase.co/storage/v1/object/public/image/${data.user_id}/${data.image_name}`
      : data?.url;

  const [hasImageFile, setHasImageFile] = useState(false);
  const imageInputRef = useRef(null);

  if (typeof data === "undefined" || isError) {
    return <Error />;
  }

  function handleImageUpload(event) {
    const file = event.target.files[0];

    if (file) {
      console.log(file.type);
      const validImageTypes = [
        "image/gif",
        "image/jpeg",
        "image/png",
        "video/mp4",
      ];
      if (validImageTypes.includes(file.type)) {
        setHasImageFile(true);
      } else {
        toast.error(
          "Invalid image type. Please select a GIF, JPEG,PNG, or video file."
        );
        event.target.value = null;
        setHasImageFile(false);
      }
    } else {
      setHasImageFile(false);
    }
  }

  async function onSubmit(formData) {
    if (imageInputRef.current && imageInputRef.current.files[0]) {
      const uploadedFile = imageInputRef.current.files[0];

      formData.imageFile = uploadedFile;
    }

    mutate(formData);
  }

  return (
    <>
      {isLoading && <Loader />}
      <PostForm
        defaultValues={{
          title: data?.title,
          content: data?.content,
          secretKey: data?.secret_key,
          flags: data?.type,
          imageUrl,
        }}
        onSubmit={onSubmit}
        handleImageUpload={handleImageUpload}
        hasImageFile={hasImageFile}
        imageInputRef={imageInputRef}
        postId={postId}
      />
    </>
  );
}

export default UpdatePost;
