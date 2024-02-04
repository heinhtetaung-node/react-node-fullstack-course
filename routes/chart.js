const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../models");

router.get("/api/chart/", async (req, res) => {
  const charts = await db.chart.findAll();
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

    db.chart
      .create(user)
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

module.exports = router;
