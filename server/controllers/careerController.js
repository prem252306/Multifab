import db from "../config/db.js";

/*
=====================================
APPLY FOR JOB
POST /api/career/apply
=====================================
*/
export const applyCareer = async (req, res) => {
  try {
    const {
      full_name,
      email,
      phone,
      position
    } = req.body;

    const resume = req.file
      ? req.file.filename
      : null;

    const sql = `
      INSERT INTO careers
      (
        full_name,
        email,
        phone,
        position,
        resume
      )
      VALUES
      (?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        full_name,
        email,
        phone,
        position,
        resume
      ],
      (err, result) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            success: false,
            message: "Database Error",
            error: err
          });
        }

        res.status(201).json({
          success: true,
          message: "Application Submitted Successfully",
          applicationId: result.insertId
        });
      }
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error
    });

  }
};

/*
=====================================
GET ALL CAREERS
GET /api/careers
=====================================
*/
export const getCareers = (req, res) => {

  const sql = `
    SELECT *
    FROM careers
    ORDER BY id DESC
  `;

  db.query(sql, (err, result) => {

    if (err) {

      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Database Error"
      });

    }

    res.status(200).json({
      success: true,
      total: result.length,
      careers: result
    });

  });

};

/*
=====================================
GET SINGLE CAREER
GET /api/careers/:id
=====================================
*/
export const getCareerById = (req, res) => {

  const { id } = req.params;

  db.query(
    "SELECT * FROM careers WHERE id = ?",
    [id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Application Not Found"
        });
      }

      res.json({
        success: true,
        data: result[0]
      });

    }
  );

};

/*
=====================================
DELETE CAREER
DELETE /api/careers/:id
=====================================
*/
export const deleteCareer = (req, res) => {

  const { id } = req.params;

  db.query(
    "DELETE FROM careers WHERE id = ?",
    [id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message: "Application Deleted"
      });

    }
  );

};