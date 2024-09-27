const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema({
  id: Number,
  email: String,
  name: String,
  role: String,
  avatar: String,
});

module.exports = mongoose.model("TeamMember", teamMemberSchema);
