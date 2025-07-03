import express from "express";
const app = express();
import cors from "cors"
app.use(cors())
app.use(express.json())
import Book from "./models/book.model.js";
// user route
import userRouter from "./routes/user.routes.js"
app.use("/api/auth",userRouter)

// book routes
import bookRouter from "./routes/books.router.js"
app.use("/api/books",bookRouter)

// ai routes
import aiRouter from "./routes/airoute.routes.js"
app.use("/api/ai",aiRouter)
// home page
app.get("/",async(req,res)=>{
    res.send("server is live")
    // await Book.deleteMany({})
})



export {app};