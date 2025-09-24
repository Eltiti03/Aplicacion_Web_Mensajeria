import { useState } from "react";
import "../Styles/Home.css";
import "../Styles/HomeMovil.css";
import LogoutIcon from "../assets/Logout.png";
import GroupAdd from "../assets/group_add.png";

interface Chat {
  id: string;
  user: string;
  messages: { from: string; text: string }[];
  isGroup?: boolean; // 🔹 Nuevo campo para distinguir grupos
}

export default function Home() {
  const [chats, setChats] = useState<Chat[]>([
    { id: "1", user: "John", messages: [{ from: "Juan", text: "Ey bro!" }] },
    { id: "2", user: "Jose", messages: [] },
    { id: "3", user: "Javier", messages: [] },
    { id: "4", user: "Julian", messages: [] },
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
    alert("Sesión cerrada ✅");
  };

  const [newGroupName, setNewGroupName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) {
      alert("El nombre del grupo no puede estar vacío");
      return;
    }

    if (chats.some((chat) => chat.user === newGroupName)) {
      alert("Ya existe un grupo o chat con ese nombre");
      return;
    }

    const newGroup: Chat = {
      id: String(Date.now()),
      user: newGroupName,
      messages: [],
      isGroup: true,
    };

    setChats([...chats, newGroup]);
    console.log("Grupo creado:", newGroupName);

    setNewGroupName("");
    setIsModalOpen(false);
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
              <span className="span-icon">
                {chat.isGroup ? "👥 " : "👤 "}
                {chat.user}
              </span>
            </div>
          ))}
        </div>

        <div className="rowIcon">
          <img
            src={GroupAdd}
            alt="Crear Grupo"
            className="group-icon"
            onClick={() => setIsModalOpen(true)}
          />
          <img
            src={LogoutIcon}
            alt="Cerrar sesión"
            className="logout-icon"
            onClick={handleLogout}
          />
        </div>
      </aside>

      <main className="chat-window">
        {activeChat ? (
          <>
            <header className="chat-header">
              <h2>
                {activeChat.isGroup ? "👥 " : "👤 "}
                {activeChat.user}
              </h2>
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

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Nuevo Grupo</h3>
            <input
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="Nombre del grupo"
            />
            <div className="modal-actions">
              <button onClick={handleCreateGroup}>Crear</button>
              <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
