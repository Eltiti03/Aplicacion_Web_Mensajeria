import { Router } from "express";
import { cChatsWeb } from "../../controller/cChats.js";

export const router = Router();

router.post("/register", cChatsWeb.cpostaggClient);
router.get("/userlist", cChatsWeb.cgetClients);
router.post("/", cChatsWeb.cpostLogin);
