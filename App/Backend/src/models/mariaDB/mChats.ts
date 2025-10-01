import { randomUUID } from "crypto";
import mariadb from "mariadb";
import bcrypt from "bcrypt"

const pool = mariadb.createPool({
  host: "192.168.0.169",
  user: "JULIAN1044",
  port: 3307,
  password: "1234567890",
  database: "CHAT_WEB",
  connectionLimit: 10,
  bigIntAsNumber: true,
});

export interface client {
  ID?: string;
  MAIL: string;
  PASS_HASH: string;
  CREATED_AT?: Date;

}

export class Chat_Web {
  static async mpostaggClient(input: client) {
    let conn;
    try {
      conn = await pool.getConnection();
      

      const newClient = {
        ID: randomUUID(),
        MAIL: input.MAIL,
        PASS_HASH: input.PASS_HASH,
      };

      const hash = await bcrypt.hash(newClient.PASS_HASH, 12)
      //console.log({encrypt: hash})

      const result = await conn.query(
        "INSERT INTO USERS (ID, MAIL, PASS_HASH) VALUE (?,?,?)",
        [newClient.ID, newClient.MAIL, hash]
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

  static async mpostLogin(correo: client) {
    let conn;
    try {
      conn = await pool.getConnection();
      const result = await conn.query("SELECT * FROM USERS WHERE MAIL = ?", [
        correo.MAIL,
      ]);
      if (result.length !== 0) {
        return result;
      } else {
        return false;
      }
    } catch (error) {
    } finally {
      if (conn) conn.release();
    }
  }

  static async mgetClient() {
    let conn;
    try {
      conn = await pool.getConnection();

      const result = await conn.query("SELECT * FROM USERS");

      return result;
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }
}
