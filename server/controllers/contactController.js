import db from "../config/db.js";

export const submitContact = (req, res) => {

  try {

    const {
      name,
      email,
      phone,
      subject,
      message
    } = req.body;

    const sql = `
      INSERT INTO contacts
      (
        name,
        email,
        phone,
        subject,
        message
      )
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        name,
        email,
        phone,
        subject,
        message
      ],
      (err, result) => {

        if (err) {

          console.log(err);

          return res.status(500).json({
            success: false,
            error: err.message
          });

        }

        res.status(200).json({
          success: true,
          message: "Message Sent Successfully"
        });

      }
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

};
export const getContacts = (req, res) => {

  db.query(
    "SELECT * FROM contacts ORDER BY id DESC",
    (err, result) => {

      if (err)
        return res.status(500).json(err);

      res.json(result);

    }
  );

};

export const deleteContact = (req, res) => {

  db.query(
    "DELETE FROM contacts WHERE id=?",
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