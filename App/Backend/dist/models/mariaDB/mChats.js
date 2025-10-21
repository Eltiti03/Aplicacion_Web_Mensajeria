// App/Backend/models/mariaDB/mChats.ts
import { randomUUID } from "crypto";
import { executeQuery } from "./conn.js";
export class Chat_Web {
    userServices;
    constructor(userServices) {
        this.userServices = userServices;
    }
    async mpostaggClient(input) {
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
    static async mpostLogin(correo) {
        const query = "SELECT * FROM USERS WHERE MAIL = ?";
        const params = [correo.MAIL];
        const result = await executeQuery(query, params);
        if (result.length !== 0) {
            return result;
        }
        else {
            return false;
        }
    }
    static async mgetClient() {
        const result = "SELECT * FROM USERS";
        const resultF = await executeQuery(result);
        return resultF;
    }
}
