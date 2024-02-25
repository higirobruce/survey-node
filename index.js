const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { surveyRouter } = require("./routes/survey");

const app = express();
const port = 3001;

const DB_USER = process.env.EPROC_DB_USER;
const DB_PASSWORD = process.env.EPROC_DB_PASSWORD;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

//Set up default mongoose connection
var mongoDB = `mongodb://${DB_USER}:${DB_PASSWORD}@127.0.0.1:27017/survey?authSource=admin`;

mongoose.connect(mongoDB);

//Get the default connection
var db = mongoose.connection;
db.on(
  "error",
  console.error.bind(
    console,
    `MongoDB connection error with user:${DB_USER} pwd:${DB_PASSWORD} :`
  )
);

db.once("open", () => console.log("connected to db"));

app.use(express.json());
app.use(cors());

app.use("/survey", surveyRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
