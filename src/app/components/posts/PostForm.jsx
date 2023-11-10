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
    <div className="sm:w-[600px] w-[90%] sm:text-xl text-base mx-auto my-10 bg-white dark:bg-gray-700 dark:border-gray-700 shadow-2xl border rounded-md">
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
          className="border-2 px-2 h-[100px] sm:h-[200px]"
        />

        <label className="block text-[10px] sm:text-lg">
          Upload Image:
          <input
            type="file"
            ref={imageInputRef}
            className="px-2 text-[10px] sm:text-base"
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

        <div className="flex items-center text-sm sm:text-base gap-2">
          <p className="font-semibold">Flags:</p>
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

        <Button
          type="md"
          className="font-semibold text-base sm:text-lg md:text-2xl"
        >
          {postId ? "Edit Post" : "Create Post"}
        </Button>
      </form>
    </div>
  );
}

export default PostForm;
