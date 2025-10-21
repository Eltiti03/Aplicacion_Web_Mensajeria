// App/Backend/models/mariaDB/mChats.ts

import { randomUUID } from "crypto";
import { UserServices } from "../../services/userServices.service.js";
import { executeQuery } from "./conn.js";
import { client } from "../interfaces/user.interface.js";
export class Chat_Web {
  userServices: UserServices;

  constructor(userServices: UserServices) {
    this.userServices = userServices;
  }

  async mpostaggClient(input: client) {
    const newClient = {
      ID: randomUUID(),
      MAIL: input.MAIL,
      PASS_HASH: input.PASS_HASH,
    };

    const hash = await this.userServices.passHash(newClient.PASS_HASH);

    const result = "INSERT INTO USERS (ID, MAIL, PASS_HASH) VALUE (?,?,?)";
    const params = [newClient.ID, newClient.MAIL, hash];

    await executeQuery(result, params);

    return newClient;
  }

  static async mpostLogin(correo: client) {
    const query = "SELECT * FROM USERS WHERE MAIL = ?";
    const params = [correo.MAIL];

    const result = await executeQuery(query, params);
    if (result.length !== 0) {
      return result;
    } else {
      return false;
    }
  }

  static async mgetClient() {
    const result = "SELECT * FROM USERS";
    const resultF = await executeQuery(result);

    return resultF;
  }
}
