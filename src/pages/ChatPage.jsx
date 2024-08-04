import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, json } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import NavBarChat from "../components/NavBarChat";
import { BiCode, BiData, BiSolidSend } from "react-icons/bi";
import { CodeBlock, dracula } from "react-code-blocks"; // Importa el CodeBlock

const ChatPage = () => {
  const navigate = useNavigate();
  const { ruc } = useParams();
  const [message, setMessage] = useState("");
  const [prompts, setPrompts] = useState(() => {
    const savedPrompts = localStorage.getItem(`chatHistory-${ruc}`);
    return savedPrompts ? JSON.parse(savedPrompts) : [];
  });
  const textareaRef = useRef(null);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    resizeTextarea();
  };

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleChat = async () => {
    if (message.trim() === "") return;
    const prompt = message.trim();

    const newPrompt = { prompt, response: null };
    setPrompts((prevPrompts) => {
      const updatedPrompts = [...prevPrompts, newPrompt];
      localStorage.setItem(`chatHistory-${ruc}`, JSON.stringify(updatedPrompts));
      return updatedPrompts;
    });
    setMessage("");

    try {
      const res = await fetch(`http://127.0.0.1:8000/chat/${ruc}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) {
        throw new Error("Error al enviar el prompt");
      }
      const data = await res.text();
      setPrompts(prevPrompts => {
        const updatedPrompts = [...prevPrompts];
        updatedPrompts[updatedPrompts.length - 1].response = data;
        localStorage.setItem(`chatHistory-${ruc}`, JSON.stringify(updatedPrompts));
        return updatedPrompts;
      });
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  useEffect(() => {
    resizeTextarea();
  }, [message]);

  const renderResponse = (response) => {
    // Buscar si el texto tiene bloques de código delimitados por ```
    const codeBlockPattern = /```([\s\S]*?)```/g;
    const parts = response.split(codeBlockPattern);

    return parts.map((part, index) => {
      // Si el índice es impar, significa que es un bloque de código
      if (index % 2 === 1) {
        return (
          <div key={index} className="my-2">
            <CodeBlock
              text={part}
              language="xml"
              theme={dracula}
            />
          </div>
        );
      } else {
        // Si no, es texto normal
        return (
          <ReactMarkdown key={index} className="break-words overflow-hidden">
            {part}
          </ReactMarkdown>
        );
      }
    });
  };

  return (
    <div className="min-h-full flex flex-col bg-gradient-to-b from-zinc-900 via-blue-700 to-blue-800 text-white">
      <NavBarChat />
      <section className="flex flex-col items-center w-full h-full p-4">
        <div className="flex flex-col justify-between w-full min-h-screen p-4 bg-zinc-900 backdrop-filter backdrop-blur-lg bg-opacity-50 rounded-3xl">
          <nav className="w-full flex items-center justify-between p-4 bg-blue-800 bg-opacity-10 rounded-3xl">
            <div className="flex items-center space-x-2">
              <div className="text-lg font-bold">Chat Reporting</div>
            </div>
            <ul className="flex space-x-10 px-4">
              <BiCode
                size={28}
                onClick={() => navigate(`/chat/${ruc}`)}
                className="hover:text-cyan-800 cursor-pointer transition duration-300 text-cyan-600"
              />
              <BiData
                size={28}
                className="hover:text-pink-800 cursor-pointer transition duration-300 text-pink-600"
              />
            </ul>
          </nav>
          <div className="px-72 my-4">
            <div className="flex-grow overflow-y-auto p-4 flex flex-col items-end max-h-screen">
              {prompts.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="bg-zinc-800 backdrop-filter backdrop-blur-md bg-opacity-10 border-none rounded-3xl w-full max-w-md mb-6 p-4 break-words">
                    <p>{item.prompt}</p>
                  </div>
                  <div className="bg-red-500 text-white border-none rounded-3xl w-full max-w-md mb-6 p-4 break-words">
                    {renderResponse(item.response)}
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div className="bg-zinc-800 bg-opacity-70 rounded-full w-full p-4 my-4 flex items-center justify-center">
              <textarea
                ref={textareaRef}
                placeholder="Escribe tu solicitud..."
                className="flex-1 p-2 bg-transparent border-none text-white placeholder-white focus:outline-none resize-none overflow-auto"
                rows={1}
                onChange={handleInputChange}
                style={{ minHeight: "2rem", maxHeight: "6rem" }}
                value={message}
              />
              <button
                className="ml-4 p-2 bg-gradient-to-b from-blue-700 to-blue-800 rounded-full"
                onClick={handleChat}
              >
                <BiSolidSend size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ChatPage;
