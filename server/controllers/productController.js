import db from "../config/db.js";

export const getProducts = (req, res) => {
  db.query(
    "SELECT * FROM products ORDER BY id DESC",
    (err, result) => {
      if (err) {
        console.error("GET PRODUCTS ERROR:", err);
        return res.status(500).json(err);
      }
      res.json(result);
    }
  );
};

export const addProduct = (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  const {
    name,
    category,
    description,
    pressure_rating,
    temp_range,
    material,
    sizes
  } = req.body;

  const image = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO products
    (
      name,
      category,
      description,
      image,
      pressure_rating,
      temp_range,
      material,
      sizes
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      name,
      category,
      description,
      image,
      pressure_rating || "Up to 1500 PSI (103 Bar)",
      temp_range || "-20°F to 450°F (-29°C to 232°C)",
      material || "Stainless Steel 316 / 316L",
      sizes || '1/2" to 4" Flanged'
    ],
    (err, result) => {
      if (err) {
        console.error("MYSQL ADD PRODUCT ERROR:", err);
        return res.status(500).json({
          success: false,
          error: err.sqlMessage || err.message
        });
      }

      res.json({
        success: true,
        message: "Product Added Successfully"
      });
    }
  );
};

export const updateProduct = (req, res) => {
  const { id } = req.params;

  const {
    name,
    category,
    description,
    pressure_rating,
    temp_range,
    material,
    sizes
  } = req.body;

  const image = req.file ? req.file.filename : null;

  let sql;
  let values;

  if (image) {
    sql = `
      UPDATE products
      SET
        name=?,
        category=?,
        description=?,
        image=?,
        pressure_rating=?,
        temp_range=?,
        material=?,
        sizes=?
      WHERE id=?
    `;

    values = [
      name,
      category,
      description,
      image,
      pressure_rating || "Up to 1500 PSI (103 Bar)",
      temp_range || "-20°F to 450°F (-29°C to 232°C)",
      material || "Stainless Steel 316 / 316L",
      sizes || '1/2" to 4" Flanged',
      id
    ];
  } else {
    sql = `
      UPDATE products
      SET
        name=?,
        category=?,
        description=?,
        pressure_rating=?,
        temp_range=?,
        material=?,
        sizes=?
      WHERE id=?
    `;

    values = [
      name,
      category,
      description,
      pressure_rating || "Up to 1500 PSI (103 Bar)",
      temp_range || "-20°F to 450°F (-29°C to 232°C)",
      material || "Stainless Steel 316 / 316L",
      sizes || '1/2" to 4" Flanged',
      id
    ];
  }

  db.query(sql, values, (err) => {
    if (err) {
      console.error("MYSQL UPDATE PRODUCT ERROR:", err);
      return res.status(500).json(err);
    }

    res.json({
      success: true,
      message: "Product Updated"
    });
  });
};

export const deleteProduct = (req, res) => {
  db.query(
    "DELETE FROM products WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) {
        console.error("DELETE PRODUCT ERROR:", err);
        return res.status(500).json(err);
      }

      res.json({
        success: true
      });
    }
  );
};