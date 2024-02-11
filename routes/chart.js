const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../models");

router.get("/api/chart/", async (req, res) => {
  const charts = await db.chart.findAll({
    order: [["id", "desc"]],
  });
  res.status(200).json(charts);
});

router.post(
  "/api/chart/",
  check("name").notEmpty().withMessage("name is required"),
  check("age")
    .notEmpty()
    .withMessage("age is required")
    .isInt()
    .withMessage("age must be numeric"),
  check("gender")
    .notEmpty()
    .withMessage("gender is required")
    .isIn(["M", "F"])
    .withMessage("gender should be M or F"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, age, gender } = req.body;
    const user = {
      name,
      age,
      gender,
    };
    // db.chart
    //   .create(user)
    db.sequelize
      .query(
        `INSERT INTO charts (name,age,gender,createdAt,updatedAt) VALUES ('${name}','${age}','${gender}',CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP())`
      )
      .then((data) => {
        return res.json({
          success: true,
          message: "User Created!",
          data: data,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ success: false, message: err });
      });
  }
);

router.delete("/api/chart/:id", async (req, res) => {
  const id = req.params.id;
  db.chart
    .destroy({
      where: {
        id,
      },
    })
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(500).json({ success: false, message: err }));
});

router.put(
  "/api/chart/",
  check("id").notEmpty().withMessage("id is required"),
  check("name").notEmpty().withMessage("name is required"),
  check("age")
    .notEmpty()
    .withMessage("age is required")
    .isInt()
    .withMessage("age must be numeric"),
  check("gender")
    .notEmpty()
    .withMessage("gender is required")
    .isIn(["M", "F"])
    .withMessage("gender should be M or F"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, age, gender, id } = req.body;
    const user = {
      name,
      age,
      gender,
    };

    db.chart
      .update(user, {
        where: {
          id,
        },
      })
      .then((data) => {
        return res.json({
          success: true,
          message: "User Updated!",
          data: data,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ success: false, message: err });
      });
  }
);

module.exports = router;
