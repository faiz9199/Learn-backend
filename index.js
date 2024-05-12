const express = require("express");
const cookieParser = require("cookie-parser")
const app = express();
require('dotenv').config()
require("./db");

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello world");
});

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/", userRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
