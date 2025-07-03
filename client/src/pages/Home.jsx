import React, { useState, useEffect, useRef, useContext } from 'react'
import GoogleBookCard from "../components/GoogleBookCard";
import { searchBooks } from "../services/googleBookService";
import { addBook, getBooks,fetchAllBooks } from '../services/bookService';
import Chatbot from '../components/Chatbot';
import { AuthContext } from "../context/AuthContext";

// Banner data
const banners = [
  {
    title: "Welcome to BookRepo",
    subtitle: "Your personal library, powered by Google Books",
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Discover New Reads",
    subtitle: "Search and add books to your wishlist instantly",
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Track Your Progress",
    subtitle: "Keep notes and track your reading journey",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
  }
];

const Home = () => {
  const { user } = useContext(AuthContext);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [bannerIdx, setBannerIdx] = useState(0);
  const [recentBooks, setRecentBooks] = useState([]);
  const bannerTimeout = useRef();

  const handleSearch = async (e) => {
    e.preventDefault();
    const results = await searchBooks(query);
    setSearchResults(results || []);
  };

  const handleGoogleAdd = async (info) => {
    console.log("add book called")
    const book = {
      title: info.title,
      author: info.authors?.join(", ") || "Unknown",
      totalPages: info.pageCount || 0,
      pagesRead: 0,
      notes: "",
      status: "wishlist",
      description:info.description|| "",
      image: info.imageLinks?.thumbnail || "",
    };
    await addBook(book);
    alert(`Added "${info.title}" to your library`);
  };

  // Carousel navigation
  const prevBanner = () => setBannerIdx((bannerIdx - 1 + banners.length) % banners.length);
  const nextBanner = () => setBannerIdx((bannerIdx + 1) % banners.length);

  // Auto change banners every 5 seconds
  useEffect(() => {
    bannerTimeout.current = setTimeout(() => {
      setBannerIdx((idx) => (idx + 1) % banners.length);
    }, 5000);
    return () => clearTimeout(bannerTimeout.current);
  }, [bannerIdx]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-2 sm:px-0">
      {/* Custom Carousel */}
      <section className="relative w-full max-w-5xl mx-auto h-[36vh] sm:h-[52vh] md:h-[65vh] flex items-center justify-center mt-4 sm:mt-10 rounded-xl sm:rounded-3xl shadow-xl overflow-hidden">
        {/* Banner Image */}
        <img
          src={banners[bannerIdx].img}
          alt={banners[bannerIdx].title}
          className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 scale-105"
          style={{ filter: "brightness(0.7) blur(0px)" }}
        />
        {/* Banner Content */}
        <div className="relative z-10 flex flex-col items-center w-full px-2 sm:px-6">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-4 sm:p-8 max-w-2xl w-full border border-white/30">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-2 text-center text-blue-900 tracking-tight drop-shadow">
              {banners[bannerIdx].title}
            </h1>
            <p className="text-base sm:text-lg md:text-2xl mb-4 text-center text-blue-700 font-medium drop-shadow">
              {banners[bannerIdx].subtitle}
            </p>
          </div>
          {/* Carousel Controls */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={prevBanner}
              className="bg-blue-600/80 hover:bg-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl shadow-md transition border-2 border-white"
              aria-label="Previous"
              type="button"
            >
              &#8592;
            </button>
            <button
              onClick={nextBanner}
              className="bg-blue-600/80 hover:bg-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl shadow-md transition border-2 border-white"
              aria-label="Next"
              type="button"
            >
              &#8594;
            </button>
          </div>
          {/* Dots */}
          <div className="flex gap-2 mt-4">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setBannerIdx(idx)}
                className={`w-3 h-3 rounded-full border-2 border-blue-700 transition-all duration-300 ${bannerIdx === idx ? "bg-blue-700" : "bg-white/80"}`}
                aria-label={`Go to banner ${idx + 1}`}
                type="button"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 -mt-10 mb-14 max-w-2xl mx-auto z-10 relative px-2"
      >
        <input
          type="text"
          placeholder="Search by title or author"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border border-gray-300 p-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white/90 w-full md:w-auto text-lg"
        />
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-lg font-bold shadow transition w-full md:w-auto text-lg"
        >
          Search
        </button>
      </form>

      {/* Show search results from Google */}
      {searchResults.length > 0 && (
        <section className="mb-16 max-w-5xl mx-auto px-2">
          <h3 className="font-bold mb-6 text-2xl text-blue-800 text-center">Search Results</h3>
          <div className="grid gap-8 md:grid-cols-2">
            {searchResults.map((book) => (
              <GoogleBookCard key={book.id} book={book} onAdd={handleGoogleAdd} />
            ))}
          </div>
        </section>
      )}
      
      <Chatbot/>

      {/* Footer */}
      <footer className="text-center text-gray-400 text-xs py-8 mt-8 px-2">
        &copy; {new Date().getFullYear()} BookRepo &mdash; Your personal reading companion.
      </footer>
    </div>
  )
}

export default Home;