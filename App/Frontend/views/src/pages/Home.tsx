import { useState } from "react";
import "../Styles/Home.css";
import "../Styles/HomeMovil.css";
import LogoutIcon from "../assets/Logout.png"; // 🔹 importa tu icono

interface Chat {
  id: string;
  user: string;
  messages: { from: string; text: string }[];
}

export default function Home() {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      user: "John",
      messages: [{ from: "Juan", text: "Ey bro!" }],
    },
    {
      id: "2",
      user: "Jose",
      messages: [{ from: "", text: "" }],
    },
    {
      id: "3",
      user: "Javier",
      messages: [{ from: "", text: "" }],
    },
    {
      id: "4",
      user: "Julian",
      messages: [{ from: "", text: "" }],
    },
  ]);

  const [activeChat, setActiveChat] = useState<Chat | null>(chats[0]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim() || !activeChat) return;

    const updatedChats = chats.map((chat) =>
      chat.id === activeChat.id
        ? {
            ...chat,
            messages: [...chat.messages, { from: "me", text: newMessage }],
          }
        : chat
    );

    setChats(updatedChats);
    setActiveChat({
      ...activeChat,
      messages: [...activeChat.messages, { from: "me", text: newMessage }],
    });

    setNewMessage("");
  };

  const handleLogout = () => {
    alert("Sesión cerrada ✅"); // aquí va tu lógica real de logout
  };

  return (
    <div className="home-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h5>Mi Usuario</h5>
        </div>

        <div className="chat-list">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${
                activeChat?.id === chat.id ? "active" : ""
              }`}
              onClick={() => setActiveChat(chat)}
            >
              <span>{chat.user}</span>
            </div>
          ))}
        </div>

        {/* 🔹 Icono de logout en vez de botón */}
        <img
          src={LogoutIcon}
          alt="Cerrar sesión"
          className="logout-icon"
          onClick={handleLogout}
        />
      </aside>

      <main className="chat-window">
        {activeChat ? (
          <>
            <header className="chat-header">
              <h2>{activeChat.user}</h2>
            </header>

            <div className="messages">
              {activeChat.messages.map((msg, i) => (
                <div
                  key={i}
                  className={`message ${
                    msg.from === "me" ? "sent" : "received"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>

            <footer className="chat-input">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Escribe un mensaje..."
              />
              <button onClick={handleSend}>➤</button>
            </footer>
          </>
        ) : (
          <div className="no-chat">Selecciona un chat para comenzar</div>
        )}
      </main>
    </div>
  );
}
