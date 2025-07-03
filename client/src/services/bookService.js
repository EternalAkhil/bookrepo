import API from "./api";

export const getBooks = (id) => API.get(`/books/${id}`);
export const addBook = (data) => API.post("/books", data);
export const updateBook = (id, data) => API.put(`/books/${id}`, data);
export const deleteBook = (id) => API.delete(`/books/${id}`);
export const fetchAllBooks = ()=>API.get("/books")

export const aiSummary = (data)=> API.post("/ai/summary",data)

export const getRecs = (data)=>API.post("/ai/recommendations",data)

export const chatbot = (data)=>API.post("/ai/chat",data)