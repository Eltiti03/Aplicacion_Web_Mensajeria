//App.ts

import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import cors from "cors";
import { router } from "./models/routes/rChats.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

app.use(express.json());
app.use("/", router);

const server = createServer(app);

const port = process.env.PORT ?? 1235;

const WSS = new WebSocketServer({ server });

WSS.on("connection", (ws) => {
  console.log("✅ Cliente conectado");

  // Evento cuando el cliente manda un mensaje
  ws.on("message", (data) => {
    console.log("📩 Mensaje recibido:", data.toString());

    // Puedes responder al mismo cliente
    ws.send("Mensaje recibido: " + data.toString());

    // O reenviar a todos los clientes conectados (broadcast)
    WSS.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(`Broadcast: ${data.toString()}`);
      }
    });
  });

  // Evento cuando el cliente se desconecta
  ws.on("close", () => {
    console.log("❌ Cliente desconectado");
  });
});

server.listen(port, () => {
  console.log(`El server se ejecuta en el puerto: http://localhost:${port}`);
});
