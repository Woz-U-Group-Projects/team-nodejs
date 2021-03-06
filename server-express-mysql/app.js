var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var models = require("./models");
var cors = require("cors");
require('dotenv').config();

var tasksRouter = require("./routes/tasks");
var usersRouter = require("./routes/users");
var topicsRouter = require("./routes/topics");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/tasks", tasksRouter);
app.use("/users", usersRouter);
app.use("/topics", topicsRouter);

models.sequelize.sync().then(function() {
  console.log("DB Sync'd up");
});

module.exports = app;
