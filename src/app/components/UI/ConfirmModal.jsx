import { useForm } from "react-hook-form";
import { ExclamationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Button from "./Button";
import { useState } from "react";
import Loader from "./Loader";
import { sharePost } from "../services/FetchApi";
import { useUser } from "../contexts/userContext";
import toast from "react-hot-toast";
import { takeScreenshot } from "../services/Helper";

function ConfirmModal({ setShowConfirmModal, postId }) {
  const { userId } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { flags: "question" } });

  function handleCloseModal(e) {
    if (e.target === e.currentTarget) {
      setShowConfirmModal(false);
    }
  }

  async function onSubmit(data) {
    try {
      setIsLoading(true);
      const { url } = await takeScreenshot(
        `https://openchatter.netlify.app/${postId}`
      );
      const content = { ...data, postId, userId, url };
      await sharePost(content);
      toast.success("Successfully Share Post");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
      setShowConfirmModal(false);
    }
  }

  return (
    <div
      onClick={handleCloseModal}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="bg-gray-200 rounded-lg p-8 shadow-lg relative w-[400px]">
        <div className="absolute top-2 right-3">
          <Button
            className="hover:opacity-50"
            onClick={() => setShowConfirmModal(false)}
          >
            <XMarkIcon className="w-6 h-6" />
          </Button>
        </div>

        <div className="text-xl font-bold">Share Post</div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-4"
        >
          <div className="flex flex-col">
            <input
              {...register("title", { required: true })}
              type="text"
              className="border-2 px-2 text-lg rounded-lg"
              placeholder="Title"
            />
            {errors.title && (
              <span className="px-2 flex gap-2 text-red-500">
                Title is required
                <ExclamationCircleIcon className="w-6 h-6" />
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <input
              {...register("content", { required: true })}
              type="text"
              className="border-2 px-2 text-lg rounded-lg"
              placeholder="Content"
            />
            {errors.content && (
              <span className="px-2 flex gap-2 text-red-500">
                Content is required
                <ExclamationCircleIcon className="w-6 h-6" />
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <input
              {...register("secretKey", { required: true })}
              type="text"
              className="border-2 px-2 text-lg rounded-lg"
              placeholder="Secret key"
            />
            {errors.secretKey && (
              <span className="px-2 flex gap-2 text-red-500">
                Secret key is required
                <ExclamationCircleIcon className="w-6 h-6" />
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <strong>Flags:</strong>
            <label>
              <input
                className="mr-1 text-lg"
                type="radio"
                value="question"
                {...register("flags")}
              />
              Question
            </label>
            <label>
              <input
                className="mr-1 text-lg"
                type="radio"
                value="opinion"
                {...register("flags")}
              />
              Opinion
            </label>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              className="sm hover:opacity-50"
              onClick={() => setShowConfirmModal(false)}
            >
              Cancel
            </Button>

            {isLoading ? (
              <Loader />
            ) : (
              <Button
                type="submit"
                className="sm bg-blue-500 hover:bg-blue-700 rounded font-semibold"
              >
                Share
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConfirmModal;
