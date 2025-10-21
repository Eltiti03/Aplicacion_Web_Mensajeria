// App/Backend/src/controller/controller_user/cChat.ts

import { Request, Response, Router } from "express";
import { Chat_Web } from "../../models/mariaDB/mChats.js";
import {
  validateLogin,
  validateUser,
} from "../../models/validations/schemas.js";
import { UserServices } from "../../services/userServices.service.js";

export class cChatsWeb {
  protected userServices: UserServices;
  protected chatweb: Chat_Web;

  constructor(userServices: UserServices, chatweb: Chat_Web) {
    this.userServices = userServices;
    this.chatweb = chatweb;
  }

  listenRouter() {
    const router = Router();

    router.post("/register", this.cpostaggClient.bind(this));
    router.get("/userlist", cChatsWeb.cgetClients);
    router.post("/login", this.cpostLogin.bind(this));

    return router;
  }

  async cpostaggClient(req: Request, res: Response) {
    try {
      const result = validateUser(req.body);
      console.log(req.body);
      console.log({ success: result });

      if (!result.success) {
        return res
          .status(422)
          .json({ error: "Digite los datos correctamente... (aggClient)" });
      }
      const caggClient = await this.chatweb.mpostaggClient(result.data);
      return res.status(201).json({ success: true, caggClient });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error en el servidor!! (aggClient)" });
    }
  }
  async cpostLogin(req: Request, res: Response) {
    const result = validateLogin(req.body);

    try {
      if (!result.success) {
        res
          .status(422)
          .json({ success: false, message: "Debe ser un correo valido..." });
      } else {
        const cLogin = await Chat_Web.mpostLogin(result.data);

        const pass = result.data.PASS_HASH;
        const reqLogin = result.data;
        const hash_val = await this.userServices.passCompare(
          pass,
          cLogin[0].PASS_HASH
        );
        if (cLogin[0].MAIL === reqLogin.MAIL && hash_val === true) {
          console.log("credenciales correctas!!");
          res.status(201).json({ success: true, reqLogin });
        } else {
          res
            .status(401)
            .json({ success: false, message: "Credenciales invalidadas..." });
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
