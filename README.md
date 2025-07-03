# BookRepo

BookRepo is a modern, responsive web application for managing your personal book library.  
It allows you to search for books, add them to your collection, track your reading progress, write notes, and get AI-powered summaries and recommendations.

## Features

- 📚 **Personal Library:** Add, update, and delete books in your collection.
- 🔍 **Search:** Find books by title or author using Google Books API.
- 📝 **Notes:** Add and edit notes for each book.
- 📈 **Progress Tracking:** Track your reading status and pages read.
- 🤖 **AI Summary:** Get AI-generated summaries for your books.
- 💡 **Recommendations:** Receive book recommendations based on your library.
- 🔐 **Authentication:** Register, login, and sign in with Google.
- 💻 **Responsive Design:** Works great on mobile, tablet, and desktop.

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** JWT
- **AI Features:** Gemini API (or similar)
- **Other:** Passport.js, Google Books API

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/EternalAkhil/bookrepo.git
   cd bookrepo
   ```

2. **Install dependencies:**
   ```sh
   cd client
   npm install
   cd ../server
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in both `client` and `server` directories.
   - Add your MongoDB URI, JWT secret,and any API keys.

4. **Run the app:**
   - **Backend:**  
     ```sh
     cd server
     npm start
     ```
   - **Frontend:**  
     ```sh
     cd client
     npm start
     ```

5. **Visit:**  
   Open [http://localhost:5000](http://localhost:5000) in your browser.

## Folder Structure

```
bookrepo/
  client/      # React frontend
  server/      # Node.js backend
  .gitignore
  README.md
```


## License

[MIT](LICENSE)

---

**Enjoy managing your reading journey with BookRepo!**