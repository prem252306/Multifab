import db from "../config/db.js";
import jwt from "jsonwebtoken";

export const loginAdmin = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM admins WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Invalid Credentials"
        });
      }

      const admin = result[0];

      const token = jwt.sign(
        {
          id: admin.id,
          email: admin.email
        },
        "unitec_secret_key",
        {
          expiresIn: "1d"
        }
      );

      res.json({
        success: true,
        token
      });
    }
  );
};

export const updateAdmin = (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  db.query(
    "SELECT * FROM admins WHERE password = ?",
    [currentPassword],
    (err, result) => {
      if (err) {
        console.error("SELECT ADMINS ERROR:", err);
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Incorrect current password"
        });
      }

      const admin = result[0];
      const newEmail = email || admin.email;
      const newPass = newPassword || admin.password;

      db.query(
        "UPDATE admins SET email = ?, password = ? WHERE id = ?",
        [newEmail, newPass, admin.id],
        (err) => {
          if (err) {
            console.error("UPDATE ADMINS ERROR:", err);
            return res.status(500).json(err);
          }

          res.json({
            success: true,
            message: "Credentials updated successfully!"
          });
        }
      );
    }
  );
};