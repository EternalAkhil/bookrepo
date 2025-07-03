import React, { useState, useRef, useEffect } from "react";
import { chatbot } from "../services/bookService";
import ReactMarkdown from "react-markdown";
import { FaComments } from "react-icons/fa";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your BookRepo assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await chatbot(newMessages);
      setMessages([...newMessages, { role: "assistant", content: res.data.reply }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Sorry, I couldn't respond right now." }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating Chatbot Icon Button */}
      <button
        className="fixed right-6 bottom-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition flex items-center justify-center hover:cursor-pointer"
        style={{ boxShadow: "0 4px 24px 0 rgba(0,0,80,0.15)" }}
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close Chatbot" : "Open Chatbot"}
      >
        <FaComments className="text-2xl" />
      </button>

      {/* Chatbot Panel */}
      {open && (
        <div className="fixed right-6 bottom-24 z-50 w-80 max-w-[95vw]">
          <div className="bg-white rounded-xl shadow-2xl border border-blue-200 flex flex-col h-[450px]">
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg max-w-[90%] ${
                    msg.role === "user"
                      ? "bg-blue-100 self-end text-right"
                      : "bg-gray-100 self-start"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  ) : (
                    msg.content
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage} className="flex border-t p-2 gap-2">
              <input
                className="flex-1 rounded-lg border px-3 py-2 focus:outline-none"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={loading}
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50"
                disabled={loading}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;