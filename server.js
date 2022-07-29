const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/User");

// connect database to server
require("dotenv").config({ path: "./configuration/.env" });
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    err ? console.log(err) : console.log("database connected");
  }
);
// parse data
app.use(express.json());

//Setting routes

//GET :  RETURN ALL USERS
app.get("/all", (req, res) => {
  User.find({}, (err, data) => {
    err ? console.log(err) : res.json(data);
  });
});

//POST :  ADD A NEW USER TO THE DATABASE
app.post("/newUser", (req, res) => {
  let newUser = new User(req.body);
  newUser.save((err, data) => {
    err
      ? console.log(err)
      : res.send(`"${data.firstName}" was added with success`);
  });
});

//PUT : EDIT A USER BY ID
app.put("/update/:id", (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, data) => {
      err ? console.log(err) : res.json(data);
    }
  );
});

//DELETE : REMOVE A USER BY ID
app.delete("/delete/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, data) => {
    err
      ? console.log(err)
      : res.send(`user with id:"${req.params.id}" was removed`);
  });
});

app.listen(process.env.PORT, (err) => {
  err
    ? console.log(err)
    : console.log("server is running on port " + process.env.PORT);
});
