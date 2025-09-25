//App.ts
import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import cors from "cors";
import { router } from "./models/routes/rChats.js";
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
}));
app.use(express.json());
app.use("/", router);
const server = createServer(app);
const port = process.env.PORT ?? 1235;
const WSS = new WebSocketServer({ server });
WSS.on("connection", (ws) => {
    console.log("EL valecita esta conectado!!");
});
WSS.on("message", (data) => {
    console.log("R: ", data.toString());
});
WSS.on("close", () => {
    console.log("EL vale ya se fue...");
});
server.listen(port, () => {
    console.log(`El server se ejecuta en el puerto: http://localhost:${port}`);
});
