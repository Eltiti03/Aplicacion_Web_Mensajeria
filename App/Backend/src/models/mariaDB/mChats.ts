import { randomUUID } from "crypto";
import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: "192.168.0.169",
  user: "root",
  port: 3037,
  password: "rootpassword",
  database: "CHAT_WEB",
  connectionLimit: 100,
  bigIntAsNumber: true,
});

export interface client {
  ID?: string;
  MAIL: string;
  PASS: string;
}

export class Chat_Web {
  static async postaggClient(input: client) {
    let conn;
    try {
      conn = await pool.getConnection();
      const newClient = {
        ID: randomUUID(),
        MAIL: input.MAIL,
        PASS: input.PASS,
      };

      const result = await conn.query(
        "INSERT INTO USERS (ID, MAIL, PASS) VALUE (?,?,?)",
        [newClient.ID, newClient.MAIL, newClient.PASS]
      );
      const mensaje = { info: result };
      console.log(mensaje);

      return newClient;
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }
}
