const express = require("express");
const router = express.Router();
const TeamMember = require("../models/teamMember");

router.get("/", async (req, res) => {
  const teamMembers = await TeamMember.find();
  res.json(teamMembers);
});

module.exports = router;
