import { useForm } from "react-hook-form";
import Button from "../UI/Button";

function PostForm({
  defaultValues,
  onSubmit,
  handleImageUpload,
  hasImageFile,
  imageInputRef,
  postId,
}) {
  const { register, handleSubmit, watch } = useForm({
    defaultValues,
  });

  const hasImageUrl = watch("imageUrl");

  return (
    <form
      className="px-6 py-8 gap-4 flex flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="text"
        {...register("title")}
        placeholder="Title"
        className="border-2 px-2"
        required
      />

      <textarea
        type="text"
        {...register("content")}
        placeholder="Content (Optional)"
        className="border-2 px-2 h-[200px]"
      />

      <label className="block">
        Upload Image:
        <input
          type="file"
          ref={imageInputRef}
          className="px-2"
          accept="image/gif,image/jpeg,image/png,video/mp4"
          onChange={handleImageUpload}
          disabled={!!hasImageUrl}
        />
      </label>

      <input
        type="text"
        {...register("imageUrl")}
        placeholder="Image URL (Optional)"
        className="border-2 px-2"
        disabled={!!hasImageFile}
      />

      <input
        type="text"
        {...register("secretKey")}
        placeholder="Secret Key"
        className="border-2 px-2"
        required
      />

      <div className="flex gap-2">
        <strong>Flags:</strong>
        <label>
          <input
            className="mr-1"
            type="radio"
            value="question"
            {...register("flags")}
          />
          Question
        </label>
        <label>
          <input
            className="mr-1"
            type="radio"
            value="opinion"
            {...register("flags")}
          />
          Opinion
        </label>
      </div>

      <Button type="md">{postId ? "Edit Post" : "Create Post"}</Button>
    </form>
  );
}

export default PostForm;
