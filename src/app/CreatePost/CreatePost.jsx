"use client";
import { useRef, useState } from "react";
import { createPost } from "../components/services/FetchApi";
import { useUser } from "../components/contexts/userContext";
import PostForm from "../components/posts/PostForm";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "../components/UI/Loader";

function CreatePost() {
  const { userId } = useUser();
  const [hasImageFile, setHasImageFile] = useState(false);
  const imageInputRef = useRef(null);
  const [isCreating, setIsCreating] = useState(false);

  const router = useRouter();

  function handleImageUpload(event) {
    const file = event.target.files[0];

    if (file) {
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(file.type)) {
        setHasImageFile(true);
      } else {
        alert("Invalid image type. Please select a GIF, JPEG, or PNG file.");
        event.target.value = null;
        setHasImageFile(false);
      }
    } else {
      setHasImageFile(false);
    }
  }

  async function onSubmit(data) {
    if (imageInputRef.current && imageInputRef.current.files[0]) {
      const uploadedFile = imageInputRef.current.files[0];

      data.imageFile = uploadedFile;
    }

    try {
      setIsCreating(true);
      await createPost({ ...data, userId });
      toast.success("Successfully Create Post");
      router.push("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <>
      {isCreating && <Loader />}
      <PostForm
        defaultValues={{ flags: "question" }}
        onSubmit={onSubmit}
        handleImageUpload={handleImageUpload}
        hasImageFile={hasImageFile}
        imageInputRef={imageInputRef}
      />
    </>
  );
}

export default CreatePost;
