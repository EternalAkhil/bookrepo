import express, { text } from "express";
import ai from "../utils/openai.js";
import auth from "../middleware/auth.middleware.js";
import geminiAi from "../utils/gemini.js";
const router = express.Router();
router.post("/summary", auth, async (req, res) => {
  const { title, description } = req.body;
  const shortDescription = description && description.length > 1500
    ? description.slice(0, 1500) + "..."
    : description;
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `Summarize the book titled "${title}" using this description:\n\n${shortDescription}\n\nKeep it short and easy to understand.`,
        },
      ],
    },
  ];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents,
    });
    const summary = response.candidates?.[0]?.content?.parts?.[0]?.text || "";
    res.json({ summary });
  } catch (error) {
    console.error("Gemini error:", error.message);
    res.status(500).json({ error: "Failed to generate summary." });
  }
});

// recommendations 

router.post("/recommendations", auth, async (req, res) => {

  console.log("recommendation called")
  const books = req.body;
  const bookList = books.map((b, i) => {
    const shortDescription = b.description && b.description.length > 1500
      ? b.description.slice(0, 1500) + "..."
      : b.description;
    return `${i + 1}. ${b.title} by ${b.author} – ${b.description || "No description"}`
  }
  ).join("\n");

const prompt = `
These are books in my personal library:
${bookList}
Recommend 5 similar books which i might like with 3 line short reason. 
Respond **only in JSON array** format like this:
[
  {
    "title": "Book Title",
    "author": "Author Name",
    "reason": "Short book description"
  },
  ...
]`;

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents,
    });
    const summary = response.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const match = summary.match(/\[\s*{[\s\S]*?}\s*\]/);
    let recommendations = [];
    if (match) {
      recommendations = JSON.parse(match[0]);
    } else {
      // fallback: try to parse as is
      recommendations = JSON.parse(summary);
    }
    res.json({ recommendations });
  } catch (error) {
    console.error("Gemini error:", error.message);
    res.status(500).json({ error: "Failed to generate summary." });
  }
});

// chatbot

router.post("/chat",auth,async(req,res)=>{
    const messages = req.body
    console.log("chat bot called")
    const contents = messages.map(msg=>({
      role:msg.role,
      parts:[{text:msg.content}]
    }))
try {
  const response = await geminiAi.models.generateContent({
      model:"gemini-1.5-flash",
      contents,
    });

  const reply = response.candidates?.[0]?.content?.parts?.[0]?.text || "";
  console.log("reply fetched")
    res.json({ reply });
} catch (error) {
      console.error("Gemini chatbot error:", error.message);
    res.status(500).json({ error: "Failed to get chatbot response." });
}
    
});



export default router;
