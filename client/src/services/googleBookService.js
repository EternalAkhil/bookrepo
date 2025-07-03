import axios from "axios";

/**
 * Smart Google Books search.
 * Supports:
 *   - "author:Rowling" (author only)
 *   - "genre:fantasy" or "subject:fantasy" (subject/genre only)
 *   - "title:Atomic Habits" (title only)
 *   - Any other query: searches title and author
 */
export const searchBooks = async (query) => {
  let formattedQuery = "";

  // Parse for advanced search
  const authorMatch = query.match(/^author:(.+)/i);
  const genreMatch = query.match(/^(genre|subject):(.+)/i);
  const titleMatch = query.match(/^title:(.+)/i);

  if (authorMatch) {
    formattedQuery = `inauthor:${authorMatch[1].trim()}`;
  } else if (genreMatch) {
    formattedQuery = `subject:${genreMatch[2].trim()}`;
  } else if (titleMatch) {
    formattedQuery = `intitle:${titleMatch[1].trim()}`;
  } else {
    // Default: search both title and author
    formattedQuery = `${query.trim()}`;
  }

  // Fetch from Google Books API
  const response = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      formattedQuery
    )}&maxResults=20`
  );

  // Normalize and filter results
  const items = response.data.items || [];
  return items
    .map((item) => {
      const info = item.volumeInfo;
      return {
        id: item.id,
        title: info.title || "",
        authors: info.authors || [],
        description: info.description || "",
        pageCount: info.pageCount || 0,
        averageRating: info.averageRating || null,
        ratingsCount: info.ratingsCount || 0,
        imageLinks: info.imageLinks || {},
        previewLink: info.previewLink || "",
        publisher: info.publisher || "",
        publishedDate: info.publishedDate || "",
        categories: info.categories || [],
      };
    })
    .filter(
      (book) =>
        book.title && book.authors.length > 0 && book.imageLinks.thumbnail
    );
};
