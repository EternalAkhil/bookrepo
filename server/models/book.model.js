import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: String,
  author: String,
  status: { type: String, enum: ["read", "reading", "wishlist"], default: "wishlist" },
  totalPages: Number,
  pagesRead: { type: Number, default: 0 },
  notes: String,
  image:String,
  description:String,
  dateAdded: { type: Date, default: Date.now },
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
