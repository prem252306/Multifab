import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@Prem250604",
  database: "unitec"
});

export default db;