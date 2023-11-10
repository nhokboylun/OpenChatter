import { useRouter } from "next/navigation";
import Button from "./Button";
import { useState } from "react";
import { deletePost } from "../services/FetchApi";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { ExclamationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { queryClient } from "@/app/TanstackProvider";

function Modal({ postId, secretKey, isDelete, setShowModal }) {
  const router = useRouter();
  const [enterSK, setEnterSK] = useState("");
  const [isMatch, setIsMatch] = useState(true);
  const [isManipulating, setIsManipulating] = useState(false);

  const { mutate } = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: () => {
      queryClient.removeQueries(["posts", postId]);
      toast.success("Delete successfully");
      router.push(`/`);
      setIsManipulating(false);
    },
    onError: (error) => {
      toast.error("Error deleting post", error.message);
      setIsManipulating(false);
    },
  });

  function handleCloseModal(e) {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  }

  function handleConfirm() {
    if (enterSK === secretKey) {
      setIsManipulating(true);
      if (isDelete) {
        mutate(postId);
      } else {
        router.push(`/UpdatePost?postId=${postId}`);
      }
    } else {
      setIsMatch(false);
    }
  }

  function handleInputChange(e) {
    setEnterSK(e.target.value);
    setIsMatch(true);
  }

  return (
    <div
      onClick={handleCloseModal}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="bg-gray-200 rounded-lg p-6  dark:bg-gray-700 shadow-lg relative">
        <div className="absolute top-0 right-1">
          <Button
            className="hover:opacity-50"
            onClick={() => setShowModal(false)}
          >
            <XMarkIcon className="w-6 h-6" />
          </Button>
        </div>

        <div className="text-xl font-bold mb-4">
          {isDelete ? "Delete Modal" : "Edit Modal"}
        </div>

        <div className="mb-4 flex flex-col gap-1">
          <label>
            Please enter the secret key in order to{" "}
            <strong>{isDelete ? "delete" : "edit"}</strong>
          </label>

          <input
            className="px-2 rounded-sm"
            value={enterSK}
            onChange={handleInputChange}
            placeholder="Secret Key"
          />

          {!isMatch && (
            <p className="text-red-600 text-sm font-semibold flex gap-1 items-center">
              <span>The secret key did not match. Please try again</span>
              <ExclamationCircleIcon className="w-5 h-5" />
            </p>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button
            className="sm hover:opacity-50"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>

          <Button
            onClick={handleConfirm}
            className="sm bg-blue-500 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 rounded font-semibold"
          >
            {isManipulating ? <div className="loader"></div> : "Confirm"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
