import express from "express";
import auth from "../middleware/auth.middleware.js"
import Book from "../models/book.model.js"
const router = express.Router()

// add book

router.post("/",auth,async(req,res)=>{
  console.log("book add called")
    if (req.body){
        try {

            const book = await Book.insertOne({...req.body,userId:req.user})
            console.log("book succesfully inserted")
            res.status(200).json({msg:"book inserted"})
        } catch (error) {
            res.status(400).json({msg:error})
            
        }

    }    
})

// fetch all books
router.get("/",auth,async (req,res)=>{
  console.log("fetch all books called")
    try {
        const books = await Book.find({userId:req.user})
        res.status(201).json({books,msg:"Fethched all books"})
        console.log("books fetched")
    } catch (error) {
        res.status(500).json({msg:"error in fetching all books"})
    }
    
})

// fetching individual books

router.get("/:id",auth,async(req,res)=>{
    const id = req.params.id
    try {
        const book = await Book.findById({_id:id,userId:req.user})
        console.log("book fetched")
        res.status(201).json({book,msg:"book fetched"})
    } catch (error) {
        res.status(500).json({msg:"book cannot be fetched"})
        
    }
})
// Update book
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Book.findOneAndUpdate(
      { _id: req.params.id, userId: req.user },
      req.body,
      { new: true }
    );
    res.json({updated,msg:"book updated"});
  } catch (err) {
    res.status(500).json({ msg: "Error updating book" });
  }
});
// delete
router.delete("/:id", auth, async (req, res) => {
  try {
    await Book.findOneAndDelete({ _id: req.params.id, userId: req.user });
    res.json({ msg: "Book deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting book" });
  }
});

export default router;