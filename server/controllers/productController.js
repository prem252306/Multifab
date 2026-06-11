import db from "../config/db.js";

export const getProducts = (req, res) => {
  db.query(
    "SELECT * FROM products ORDER BY id DESC",
    (err, result) => {
      if (err) {
        console.log("GET PRODUCTS ERROR:", err);
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
};

export const addProduct = (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  const { name, category, description } = req.body;

  const image = req.file
    ? req.file.filename
    : null;

  const sql = `
    INSERT INTO products
    (
      name,
      category,
      description,
      image
    )
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      name,
      category,
      description,
      image
    ],
    (err, result) => {

      if (err) {

        console.log("MYSQL ERROR:");
        console.log(err);

        return res.status(500).json({
          success: false,
          error: err.sqlMessage
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
    description
  } = req.body;

  const image = req.file
    ? req.file.filename
    : null;

  let sql;
  let values;

  if (image) {
    sql = `
      UPDATE products
      SET
        name=?,
        category=?,
        description=?,
        image=?
      WHERE id=?
    `;

    values = [
      name,
      category,
      description,
      image,
      id
    ];
  } else {
    sql = `
      UPDATE products
      SET
        name=?,
        category=?,
        description=?
      WHERE id=?
    `;

    values = [
      name,
      category,
      description,
      id
    ];
  }

  db.query(sql, values, (err) => {
    if (err)
      return res.status(500).json(err);

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
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({
        success: true
      });

    }
  );

};