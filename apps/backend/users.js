const express = require("express");
const router = express.Router();
let users = require("./data")

// GET all users
router.get("/", (req, res) => {
  res.json(users);
});

// POST new user
router.post("/", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email required" });  
  }

  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);

  res.status(201).json(newUser);
});

module.exports = router;
