import { Request, Response } from "express";
import { Chat_Web } from "../models/mariaDB/mChats.js";
import { validateLogin, validateUser } from "../models/validations/schemas.js";

export class cChatsWeb {
  static async cpostaggClient(req: Request, res: Response) {
    try {
      const result = validateUser(req.body);
      console.log({ success: result });

      if (!result.success) {
        return res
          .status(422)
          .json({ error: "Digite los datos correctamente... (aggClient)" });
      }
      const caggClient = await Chat_Web.mpostaggClient(result.data);
      return res.status(201).json({ success: true, caggClient });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error en el servidor!! (aggClient)" });
    }
  }
  static async cpostLogin(req: Request, res: Response) {
    const result = validateLogin(req.body);

    try {
      if (!result.success) {
        res
          .status(422)
          .json({ success: false, message: "Debe ser un correo valido..." });
      } else {
        const cLogin = await Chat_Web.mpostLogin(result.data);
        console.log({ Mail: cLogin[0].MAIL, Pass: cLogin[0].PASS });
        if (!cLogin[0].MAIL || !cLogin[0].PASS) {
          res
            .status(401)
            .json({ success: false, message: "Credencuales invalidadas..." });
        } else {
          const reqLogin = result.data;
          res.status(201).json({ success: true, reqLogin });
        }
      }
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Error en el servidor... (login)" });
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
