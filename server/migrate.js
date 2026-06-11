import db from "./config/db.js";

const sql = `
  ALTER TABLE products 
  ADD COLUMN pressure_rating VARCHAR(255) DEFAULT 'Up to 1500 PSI (103 Bar)',
  ADD COLUMN temp_range VARCHAR(255) DEFAULT '-20°F to 450°F (-29°C to 232°C)',
  ADD COLUMN material VARCHAR(255) DEFAULT 'Stainless Steel 316 / 316L',
  ADD COLUMN sizes VARCHAR(255) DEFAULT '1/2" to 4" Flanged'
`;

console.log("Running database migrations...");

db.query(sql, (err) => {
  if (err) {
    if (err.code === "ER_DUP_COLUMN_NAME" || err.sqlMessage?.includes("Duplicate column")) {
      console.log("Migration skipped: Specifications columns already exist in products table.");
    } else {
      console.error("Migration failed:", err);
    }
  } else {
    console.log("Migration successful: Added specifications columns to products table.");
  }
  db.end();
  process.exit(0);
});
