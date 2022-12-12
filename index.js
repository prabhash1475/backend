const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./config/db");

const app = express();
app.use(express.json());

app.use(cors());

const { Auth } = require("./Middlewares/Authentication");
const { UserRoute } = require("./models/User.model");
const { TodoRoute } = require("./models/Todo.model");

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Welcome to Homepage");
});

app.use("/user", UserRoute);

app.use("/todos", Auth, TodoRoute);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`PORT is running on ${PORT}`);
  } catch (error) {
    console.log("Error in Database");
    console.log(error);
  }
});
