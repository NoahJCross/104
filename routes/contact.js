const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

router.post("/submitContactForm", async (req, res) => {
  try {
    const newContact = new Contact({
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message,
      agreeToTerms: req.body.agreeToTerms,
      contactMethod: req.body.contactMethod,
      subject: req.body.subject,
    });

    await newContact.save();
    res.status(200).json({ message: "Form submitted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Error submitting form" });
  }
});

router.get("/messages", async (req, res) => {
  try {
    const messages = await Contact.find();
    res.status(200).json(messages);
  } catch (err) {
    res.status(400).json({ error: "Error retrieving messages" });
  }
});

module.exports = router;
