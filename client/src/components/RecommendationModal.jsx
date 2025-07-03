import React from "react";

const RecommendationModal = ({
  open,
  onClose,
  recommendations,
  loading,
  error,
}) => {
  if (!open) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 mb-8">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-purple-200 relative">
        <button
          className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-red-500"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-purple-700">
          Recommended for You
        </h2>
        {loading && <div className="text-center text-gray-500">Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {recommendations && recommendations.length > 0 && (
          <ul className="space-y-3">
            {recommendations.map((rec, idx) => (
              <li
                key={idx}
                className="bg-purple-50 border-l-4 border-purple-400 p-3 rounded shadow text-gray-800"
              >
                <div className="font-semibold">{rec.title}</div>
                <div className="text-sm text-gray-600">{rec.author}</div>
                <div className="text-xs mt-1">{rec.description || rec.reason}</div>
              </li>
            ))}
          </ul>
        )}
        {!loading && !error && (!recommendations || recommendations.length === 0) && (
          <div className="text-gray-500 text-center">No recommendations found.</div>
        )}
      </div>
    </div>
  );
};

export default RecommendationModal;