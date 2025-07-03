import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv"
dotenv.config()

const geminiAi = new GoogleGenAI({
    apiKey:process.env.API_KEY2,
})

export default geminiAi