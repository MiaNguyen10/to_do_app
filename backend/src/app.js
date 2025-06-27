var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
require("dotenv").config();

// Import routes
const usersRoutes = require("./routes/usersRoutes");
const tasksRoutes = require("./routes/tasksRoutes");

var app = express();

// middleware to enable CORS
app.use(
  cors({
    origin: "*", // Allow all origins or specify your frontend URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// API routes
app.use("/api/users", usersRoutes);
app.use("/api/tasks", tasksRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
});


module.exports = app;
