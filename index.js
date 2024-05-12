const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("./db");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello world");
});


const productRoutes = require("./routes/productRoutes");
app.use('/api/v1/products', productRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
