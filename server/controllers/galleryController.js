import db from "../config/db.js";

export const getGallery = (req, res) => {

  db.query(
    "SELECT * FROM gallery ORDER BY id DESC",
    (err, result) => {

      if (err)
        return res.status(500).json(err);

      res.json(result);

    }
  );

};

export const addGallery = (req, res) => {

  const { title } = req.body;

  const image =
    req.file
      ? req.file.filename
      : null;

  db.query(
    `
    INSERT INTO gallery
    (
      title,
      image
    )
    VALUES (?, ?)
    `,
    [
      title,
      image
    ],
    (err) => {

      if (err)
        return res.status(500).json(err);

      res.json({
        success: true
      });

    }
  );

};

export const deleteGallery = (req, res) => {

  db.query(
    "DELETE FROM gallery WHERE id=?",
    [req.params.id],
    (err) => {

      if (err)
        return res.status(500).json(err);

      res.json({
        success: true
      });

    }
  );

};