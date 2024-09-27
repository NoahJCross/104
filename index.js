const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public_html"));

app.use("/products", require("./routes/products"));
app.use("/categories", require("./routes/categories"));
app.use("/team-members", require("./routes/teamMembers"));
app.use("/contact", require("./routes/contact"));
app.use("/auth", require("./routes/auth"));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`Web server running at: http://localhost:${port}`);
      console.log(`Type Ctrl+C to shut down the web server`);
    });
  })
  .catch((err) => console.error("Could not connect to MongoDB:", err));
