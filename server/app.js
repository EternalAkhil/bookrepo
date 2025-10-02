import express from "express";
const app = express();
import cors from "cors"; 


import helmet from 'helmet'
app.use(express.json());
// app.use(helmet())

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
import { ratelimiter } from "./middleware/auth.middleware.js";

import userRouter from "./routes/user.routes.js";
app.use("/api/auth", ratelimiter,userRouter);

import bookRouter from "./routes/books.router.js";
app.use("/api/books", bookRouter);

import aiRouter from "./routes/airoute.routes.js";
app.use("/api/ai", aiRouter);

// admin routes
import { authorzationMiddleware } from "./middleware/auth.middleware.js";
import auth from "./middleware/auth.middleware.js";
import admin from "./routes/admin.routes.js"
app.use("/api/admin",auth,authorzationMiddleware("admin"),admin)

// Home page
app.get("/", async (req, res) => {
    res.send("server is live");
    
});

export { app };