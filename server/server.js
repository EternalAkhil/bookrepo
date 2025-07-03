
import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose"
import {app} from "./app.js"

const port = process.env.PORT || 4000

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(port,()=>{
        console.log(`server is running http://localhost:${port}`);
    })
})
.catch((err)=>{
    console.log("error in connecting data base:",err)
})