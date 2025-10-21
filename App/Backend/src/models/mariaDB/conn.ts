// // App/Backend/src/models/mariaDB/conn.ts

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

export async function executeQuery(
  query: string,
  params: any[] = []
): Promise<any> {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(query, params);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (conn) conn.release();
  }
}
