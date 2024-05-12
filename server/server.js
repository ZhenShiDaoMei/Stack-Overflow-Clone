// Application server
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const bcrypt = require("bcrypt");

const User = require("./models/user");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 8000;
const dbUrl =
  process.env.MONGODB_URI ||
  "mongodb+srv://fakeStack:fakeStack1@fakestackoverflow.nm2swmo.mongodb.net/";

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define routes here
app.get("/", (req, res) => {
  res.send("Server is running.");
});


app.get("questions/all", async (req, res) => {
  const questions = await Question.find({});
  let ques = questions
    .sort((a, b) => {
      return a.askDate - b.askDate;
    })
    .reverse();
  res.json(ques);
});

app.post("/api/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email: email,
      username: username,
      password: hashedPassword,
    });
    await user.save();
    res.json({ status: 200, nextpage: "/login" });
  } catch (e) {
    res.json({ message: e + "Invalid Credentials" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password: pass } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const match = await bcrypt.compare(pass, user.password);
      if (match) {
        const accessToken = jwt.sign(user.email, secret);
        return res.json({ status: "ok", user: accessToken });
      } else {
        return res.json({ message: "Invalid Credentials" });
      }
    } else {
      return res.json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    res.json({ message: err });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
