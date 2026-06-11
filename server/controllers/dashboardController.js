import db from "../config/db.js";

export const getDashboardStats = (req, res) => {

  const statsQuery = `
    SELECT
    (SELECT COUNT(*) FROM products) AS products,
    (SELECT COUNT(*) FROM gallery) AS gallery,
    (SELECT COUNT(*) FROM contacts) AS contacts,
    (SELECT COUNT(*) FROM careers) AS careers
  `;

  db.query(statsQuery, (err, stats) => {

    if (err)
      return res.status(500).json(err);

    db.query(
      `
      SELECT *
      FROM contacts
      ORDER BY id DESC
      LIMIT 5
      `,
      (err, contacts) => {

        if (err)
          return res.status(500).json(err);

        db.query(
          `
          SELECT *
          FROM careers
          ORDER BY id DESC
          LIMIT 5
          `,
          (err, careers) => {

            if (err)
              return res.status(500).json(err);

            res.json({
              stats: stats[0],
              contacts,
              careers
            });

          }
        );

      }
    );

  });

};