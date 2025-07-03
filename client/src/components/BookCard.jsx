import React, { useState } from "react";

const BookCard = ({ book, onUpdate, onDelete, onShowSummary }) => {
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [notesInput, setNotesInput] = useState(book.notes || "");

  const handleStatusChange = (e) => {
    onUpdate(book._id, { status: e.target.value });
  };

  const handlePageChange = (e) => {
    onUpdate(book._id, { pagesRead: Number(e.target.value) });
  };

  // Open notes modal and prefill with current notes
  const handleNotesOpen = () => {
    setNotesInput(book.notes || "");
    setShowNotesModal(true);
  };

  // Save notes (append if not empty, else just update)
  const handleNotesSave = () => {
    let updatedNotes = notesInput;
    // If you want to append, uncomment below:
    // updatedNotes = (book.notes ? book.notes + "\n" : "") + notesInput;
    onUpdate(book._id, { notes: updatedNotes });
    setShowNotesModal(false);
  };

  return (
    <>
      <div className="flex gap-4 items-start bg-white/80 border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-4">
        {book.image && (
          <img
            src={book.image}
            alt={book.title}
            className="w-20 h-28 object-cover rounded-lg shadow-md border border-gray-100"
          />
        )}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-bold text-lg text-blue-800 truncate">{book.title}</h3>
            <p className="text-sm text-gray-600 mb-2 truncate">{book.author}</p>
          </div>
          <div className="flex flex-col gap-2 mt-1">
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-gray-500">Status:</label>
              <select
                value={book.status}
                onChange={handleStatusChange}
                className="border border-gray-300 rounded px-2 py-1 text-xs bg-white focus:ring-2 focus:ring-blue-200"
              >
                <option value="wishlist">Wishlist</option>
                <option value="reading">Reading</option>
                <option value="read">Read</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-gray-500">Progress:</label>
              <input
                type="number"
                value={book.pagesRead}
                onChange={handlePageChange}
                max={book.totalPages}
                min={0}
                className="border border-gray-300 rounded px-2 py-1 w-20 text-xs bg-white focus:ring-2 focus:ring-blue-200"
              />
              <span className="text-xs text-gray-400">/ {book.totalPages || "?"} pages</span>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleNotesOpen}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded font-semibold text-xs shadow transition cursor-pointer"
              >
                Notes
              </button>
              <button
                onClick={() => onDelete(book._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-semibold text-xs shadow transition cursor-pointer"
              >
                Delete
              </button>
            </div>
            {onShowSummary && (
              <button
                onClick={() => onShowSummary(book)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded font-semibold text-xs shadow transition cursor-pointer"
              >
                AI Summary
              </button>
            )}
            {book.notes && (
              <div className="mt-2 bg-yellow-50 border-l-4 border-yellow-300 px-3 py-1 rounded text-xs text-gray-700">
                <span className="font-semibold text-yellow-700">Notes:</span>
                <ul className="list-disc ml-5 mt-1">
                  {book.notes
                    .split(/\r?\n/)
                    .filter((line) => line.trim() !== "")
                    .map((line, idx) => (
                      <li key={idx}>{line}</li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notes Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full relative">
            <button
              className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-red-500 cursor-pointer"
              onClick={() => setShowNotesModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-lg font-bold mb-3 text-yellow-700">Edit Notes</h2>
            <textarea
              className="w-full border border-gray-300 rounded p-2 mb-4 min-h-[80px] focus:ring-2 focus:ring-yellow-300"
              value={notesInput}
              onChange={(e) => setNotesInput(e.target.value)}
              placeholder="Add your notes here..."
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowNotesModal(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleNotesSave}
                className="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-white font-semibold cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookCard;
