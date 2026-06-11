import db from "./config/db.js";

db.query("SELECT * FROM admins", (err, result) => {
  if (err) {
    console.error("Error querying admins table:", err);
  } else {
    console.log("=== ADMIN ACCOUNTS ===");
    console.log(result);
  }
  db.end();
});
