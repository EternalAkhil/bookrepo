import { useEffect, useMemo, useState } from "react";
import {
  getBooks,
  deleteBook,
  updateBook,
  fetchAllBooks,
  aiSummary,
  getRecs
} from "../services/bookService";
import BookCard from "../components/BookCard";
import RecommendationModal from "../components/RecommendationModal";
import { FaMagic } from "react-icons/fa"; 
import toast from 'react-hot-toast';

const statusMeta = {
  wishlist: {
    label: "📌 Wishlist",
    color: "from-blue-100 to-blue-50",
    border: "border-blue-200"
  },
  reading: {
    label: "📖 Currently Reading",
    color: "from-yellow-100 to-yellow-50",
    border: "border-yellow-200"
  },
  read: {
    label: "✅ Completed",
    color: "from-green-100 to-green-50",
    border: "border-green-200"
  }
};



const Library = () => {
  const [books, setBooks] = useState([]);
  const [query,setQuery] = useState("")

  const fetchBooks = async () => {
    const res = await fetchAllBooks();
    setBooks(res.data.books);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const onUpdate = async (id, updateData) => {
    try {
      await updateBook(id, updateData);
    fetchBooks();
    toast.success("Updated successfully")
      
    } catch (error) {
      toast.error(error)

      
    }
    
  };

  const onDelete = async (id) => {
    try {
      await deleteBook(id);
    toast.success("book deleted successfully!")
    fetchBooks();
      
    } catch (error) {
      toast.error(error)
      
    }
    
  };

  const groupedBooks = {
    wishlist: books.filter((b) => b.status === "wishlist"),
    reading: books.filter((b) => b.status === "reading"),
    read: books.filter((b) => b.status === "read"),
  };

  // handle summary
  const [summary, setSummary] = useState("");
  const [selectedBook, setSelectedBook] = useState("")
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState("")

  const handleShowSummary = async (book) => {
    console.log("summary called")
    setSelectedBook(book);
    setSummary("")
    setLoadingSummary(true)
    setSummaryError("")
    try {
      console.log(book.title)
      const result = await aiSummary({
        title: book.title,
        description: book.description || ""
      })

      setSummary(result.data.summary)

    } catch (error) {
      setSummaryError("failed to fetch book summary")
    }
    setLoadingSummary(false)
  }

  const handleCloseSummary = () => {
    setSelectedBook(null)
    setSummary("")
    setSummaryError("")
  }

  // recommendation logic
  const [showRecs, setShowRecs] = useState(false);
  const [recs, setRecs] = useState([]);
  const [loadingRecs, setLoadingRecs] = useState(false);
  const [recsError, setRecsError] = useState("");
 


  const handleGetRecommendations = async () => {
    setShowRecs(true);
    setLoadingRecs(true);
    setRecs([]);
    setRecsError("");
    try {
      const payload = books.map(b => ({
        title: b.title,
        author: b.author,
        description: b.description || ""
      }));
      const res = await getRecs(payload)

      setRecs(res.data.recommendations || []);
      console.log(recs)
    } catch (err) {
      setRecsError("Failed to fetch recommendations.");
    }
    setLoadingRecs(false);
  };

  // close recs
  const handleCloseRecs = () => {
    setShowRecs(false);
    setRecs([]);
    setRecsError("");
  };

  // search logic
  const filteredBooks = useMemo(() => {
	const lowercaseQuery = query.toLowerCase();
	return books.filter((book) =>
	  book.title.toLowerCase().includes(lowercaseQuery) ||
	  book.author.toLowerCase().includes(lowercaseQuery)
	);
  }, [query]);



  return (
    <div className="p-2 sm:p-4 max-w-6xl mx-auto min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8 text-blue-800 flex items-center gap-2">
        <span role="img" aria-label="library">📚</span> My Library
      </h2>

      {/* search bar */}
      <div className="flex items-center justify-center max-auto">
      <input
          type="text"
          placeholder="Search by title or author"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex border border-gray-300 p-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white/90 w-1/2 md:w-auto text-lg mb-4"
        />
      </div>

      {/* Show books only when searched */}
      {query.trim() !== "" ? (
        <div className="grid md:grid-cols-3 gap-4 flex-wrap mb-4">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onShowSummary={handleShowSummary}
              />
            ))
          ) : (
            <div className="text-gray-500 text-center w-full py-8">No books found for your search.</div>
          )}
        </div>
      ) : (
        <div className="text-gray-400 text-center w-full py-8">Search to see your books.</div>
      )}

      

      {/* popup code */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-2">
          <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-8 max-w-lg w-full relative">
            <button
              className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-red-500"
              onClick={handleCloseSummary}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-blue-700">
              AI Summary: {selectedBook.title}
            </h2>
            {loadingSummary && <div className="text-center text-gray-500">Loading...</div>}
            {summaryError && <div className="text-red-500">{summaryError}</div>}
            {summary && (
              <div className="prose max-w-none text-gray-800 whitespace-pre-line">{summary}</div>
            )}
          </div>
        </div>
      )}

      {books.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 sm:py-24">
          <h2 className="text-lg sm:text-xl text-gray-500 mb-2">No books in your library</h2>
          <p className="text-gray-400 text-sm sm:text-base">Start by searching and adding books!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
          {["wishlist", "reading", "read"].map((status) => (
            <div
              key={status}
              className={`rounded-2xl shadow-lg border ${statusMeta[status].border} bg-gradient-to-br ${statusMeta[status].color} p-3 sm:p-5 flex flex-col`}
            >
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-700 flex items-center gap-2">
                {statusMeta[status].label}
              </h3>
              {groupedBooks[status].length === 0 ? (
                <p className="text-gray-400 italic text-center text-sm sm:text-base">No books in this section</p>
              ) : (
                <div className="flex flex-col gap-3 sm:gap-4">
                  {groupedBooks[status].map((book) => (
                    <BookCard
                      key={book._id}
                      book={book}
                      onUpdate={onUpdate}
                      onDelete={onDelete}
                      onShowSummary={handleShowSummary}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Sticky Recommendation Button */}
      <button
        className="fixed left-4 sm:left-6 bottom-4 sm:bottom-6 z-50 bg-purple-600 hover:bg-purple-700 text-white p-3 sm:p-4 rounded-full shadow-lg transition flex items-center justify-center hover:cursor-pointer"
        onClick={handleGetRecommendations}
        aria-label="Get Recommendations"
        style={{ boxShadow: "0 4px 24px 0 rgba(80,0,120,0.15)" }}
      >
        <FaMagic className="text-xl sm:text-2xl" />
      </button>

      <RecommendationModal
        open={showRecs}
        onClose={handleCloseRecs}
        recommendations={recs}
        loading={loadingRecs}
        error={recsError}
      />
    </div>
  );
};

export default Library;
