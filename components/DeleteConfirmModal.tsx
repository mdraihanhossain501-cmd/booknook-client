import type { Book } from "@/lib/types";

type Props = {
  book: Book;
  loading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteConfirmModal({
  book,
  loading,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="text-xl font-bold">Delete this book?</h3>
        <p className="py-4 text-base-content/70">
          <span className="font-semibold text-base-content">{book.title}</span>{" "}
          will be removed permanently. This cannot be undone.
        </p>
        <div className="modal-action">
          <button
            type="button"
            className="btn"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-error"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </div>
      <div
        className="modal-backdrop"
        role="presentation"
        onClick={loading ? undefined : onCancel}
      />
    </div>
  );
}