// // App/Backend/src/App.ts

import express from "express";
import { createServer } from "http";
import dotenv from "dotenv";
import { WebSocketServer } from "ws";
import cors from "cors";
import { cChatsWeb } from "./controller/controller_user/cChats.js";
import { UserServices } from "./services/userServices.service.js";
import { Chat_Web } from "./models/mariaDB/mChats.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

const rchatsWeb = new cChatsWeb(
  new UserServices(),
  new Chat_Web(new UserServices())
);

app.use(express.json());
app.use("/chat", rchatsWeb.listenRouter());

export const server = createServer(app);

const port = process.env.PORT ?? 1235;

export const wss = new WebSocketServer({ server });

wss.on("connection", (socket) => {
  console.log("Cliente conectado!!");

  socket.send("Conexion establecida con exito!!");

  socket.on("message", (data) => {
    console.log(`Mensaje recibido del cliente: ${data}`);
    socket.send(`Mensaje recibido: ${data}`);
  });

  socket.on("close", () => {
    console.log("Cliente desconectado!!");
  });
});

server.listen(port, () => {
  console.log(`El server se ejecuta en el puerto: http://localhost:${port}`);
});
