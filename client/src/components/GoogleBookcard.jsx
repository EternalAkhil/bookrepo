import React, { useState } from "react";

const GoogleBookCard = ({ book, onAdd }) => {
  const volumeInfo = book.volumeInfo|| book;
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-44 md:h-48 mb-4 cursor-pointer group perspective"
      onClick={() => setFlipped(!flipped)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className={`transition-transform duration-500 w-full h-full absolute top-0 left-0 [transform-style:preserve-3d] ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front Side */}
        <div className="absolute w-full  bg-white border rounded-xl shadow-lg hover:shadow-2xl transition p-4 flex gap-4 backface-hidden">
          {volumeInfo.imageLinks?.thumbnail && (
            <img
              src={volumeInfo.imageLinks.thumbnail}
              alt={volumeInfo.title}
              className="w-20 h-32 md:w-24 md:h-36 object-cover rounded-lg shadow flex-shrink-0"
            />
          )}
          <div className="flex-1 flex flex-col justify-between min-w-0">
            <div className="min-w-0">
              <h3 className="font-bold text-lg text-gray-800 mb-1 truncate">
                {volumeInfo.title}
              </h3>
              <p className="text-sm text-gray-600 mb-1 truncate">
                {volumeInfo.authors?.join(", ")}
              </p>
              <p className="text-xs italic text-gray-500 mb-2 line-clamp-3 max-w-xs">
                {volumeInfo.description
                  ? volumeInfo.description.slice(0, 120) +
                    (volumeInfo.description.length > 120 ? "..." : "")
                  : "No description available."}
              </p>
              <p className="text-sm mb-2">
                ⭐ {volumeInfo.averageRating || "N/A"}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-1">
              <button
                onClick={() => onAdd(volumeInfo)}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded font-semibold transition whitespace-nowrap hover:cursor-pointer"
              >
                Add to Library
              </button>
              {volumeInfo.previewLink && (
                <a
                  href={volumeInfo.previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded font-semibold transition whitespace-nowrap"
                >
                  Preview
                </a>
              )}
            </div>
          </div>
        </div>
        {/* Back Side */}
        <div className="absolute w-full h-full bg-white border rounded-xl shadow-lg p-4 flex flex-col justify-center items-center text-gray-800 rotate-y-180 backface-hidden overflow-auto">
          <h3 className="font-bold text-lg mb-2 text-center">
            {volumeInfo.title}
          </h3>
          <p className="text-sm mb-2 text-center">
            <span className="font-semibold">Authors:</span>{" "}
            {volumeInfo.authors?.join(", ") || "Unknown"}
          </p>
          <p className="text-xs italic mb-2 text-center">
            <span className="font-semibold">Publisher:</span>{" "}
            {volumeInfo.publisher || "Unknown"}
          </p>
          <p className="text-xs mb-2 text-center">
            <span className="font-semibold">Published:</span>{" "}
            {volumeInfo.publishedDate || "Unknown"}
          </p>
          <p className="text-xs mb-2 text-center">
            <span className="font-semibold">Pages:</span>{" "}
            {volumeInfo.pageCount || "N/A"}
          </p>
          <p className="text-xs mb-2 text-center">
            <span className="font-semibold">Categories:</span>{" "}
            {volumeInfo.categories?.join(", ") || "N/A"}
          </p>
          <p className="text-xs mt-2 text-gray-700 text-center">
            {volumeInfo.description || "No description available."}
          </p>
        </div>
      </div>
      {/* Custom styles for 3D flip */}
      <style>
        {`
          .perspective {
            perspective: 1200px;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
        `}
      </style>
    </div>
  );
};

export default GoogleBookCard;
