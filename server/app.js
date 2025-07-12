import express from "express";
const app = express();
import cors from "cors"; // Ensure 'cors' is imported

// Middleware to parse JSON bodies
app.use(express.json());

const allowedOrigins = [
    process.env.FRONTEND_URL, 
    'http://localhost:3000', 
    'http://localhost:5173',  

];

const corsOptions = {
    origin: function (origin, callback) {
        
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
    optionsSuccessStatus: 204 
};

app.use(cors(corsOptions));





import Book from "./models/book.model.js";

import userRouter from "./routes/user.routes.js";
app.use("/api/auth", userRouter);

import bookRouter from "./routes/books.router.js";
app.use("/api/books", bookRouter);

import aiRouter from "./routes/airoute.routes.js";
app.use("/api/ai", aiRouter);

// Home page
app.get("/", async (req, res) => {
    res.send("server is live");
    
});

export { app };