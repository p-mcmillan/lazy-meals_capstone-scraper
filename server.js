const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.DEV_PORT || 6969;

//middleware
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`"Server is running at port" ${PORT}`);
});
