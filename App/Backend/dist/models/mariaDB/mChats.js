import { randomUUID } from "crypto";
import mariadb from "mariadb";
const pool = mariadb.createPool({
    host: "192.168.0.169",
    user: "JULIAN1044",
    port: 3307,
    password: "1234567890",
    database: "CHAT_WEB",
    connectionLimit: 10,
    bigIntAsNumber: true,
});
export class Chat_Web {
    static async postaggClient(input) {
        let conn;
        try {
            conn = await pool.getConnection();
            const newClient = {
                ID: randomUUID(),
                MAIL: input.MAIL,
                PASS: input.PASS,
            };
            const result = await conn.query("INSERT INTO USERS (ID, MAIL, PASS) VALUE (?,?,?)", [newClient.ID, newClient.MAIL, newClient.PASS]);
            const mensaje = { info: result };
            console.log(mensaje);
            return newClient;
        }
        catch (error) {
            throw error;
        }
        finally {
            if (conn)
                conn.release();
        }
    }
    static async mgetClient() {
        let conn;
        try {
            conn = await pool.getConnection();
            const result = await conn.query("SELECT * FROM USERS");
            return result;
        }
        catch (error) {
            throw error;
        }
        finally {
            if (conn)
                conn.release();
        }
    }
}
