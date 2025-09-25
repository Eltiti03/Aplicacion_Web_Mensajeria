import { Request, Response } from "express";
import { Chat_Web } from "../models/mariaDB/mChats.js";
import { validateUser } from "../models/validations/schemas.js";

export class cChatsWeb {
  static async cpostaggClient(req: Request, res: Response) {
    try {
      const result = validateUser(req.body);

      if (!result.success) {
        return res
          .status(401)
          .json({ error: "Digite los datos correctamente... (aggClient)" });
      }
      const caggClient = await Chat_Web.postaggClient(result.data);
      return res.status(201).json({ success: true, caggClient });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error en el servidor!! (aggClient)" });
    }
  }
  static async cgetClients(req: Request, res: Response) {
    try {
      const cClients = await Chat_Web.mgetClient();
      res.status(200).json(cClients);
    } catch (error) {
      res.status(500).json({ error: "Error del servidor!! (getClients)" });
    }
  }
}
