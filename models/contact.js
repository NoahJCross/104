const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  agreeToTerms: {
    type: Boolean,
    required: true,
  },
  contactMethod: {
    type: String,
    enum: ["email", "phone"],
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
