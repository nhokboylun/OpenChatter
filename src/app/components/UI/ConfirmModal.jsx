import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "./Button";

function ConfirmModal({ setShowConfirmModal }) {
  function handleCloseModal(e) {
    if (e.target === e.currentTarget) {
      setShowConfirmModal(false);
    }
  }

  return (
    <div
      onClick={(e) => handleCloseModal(e)}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="bg-gray-200 rounded-lg p-8 shadow-lg relative">
        <div className="absolute top-0 right-1">
          <Button
            className="hover:opacity-50"
            onClick={() => setShowConfirmModal(false)}
          >
            <XMarkIcon className="w-6 h-6" />
          </Button>
        </div>

        <div className="text-xl font-bold mb-4">
          Do you want to share this post?
        </div>

        <div className="flex justify-end gap-2">
          <Button
            className="sm hover:opacity-50"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </Button>

          <Button className="sm bg-blue-500 hover:bg-blue-700 rounded font-semibold">
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
