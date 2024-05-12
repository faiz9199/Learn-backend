const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    savedUser.password = undefined;
    res.status(201).json({ savedUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Error registering user" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not registered" });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    const tokenObject = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    };
    const token = jwt.sign(tokenObject, process.env.SECRET, {
      expiresIn: "4h",
    });
    res
      .status(200)
      .json({
        message: "Login successful",
        tokenObject: tokenObject,
        jwtToken: token,
      });
  } catch (error) {
    console.error("Error login user:", error);
    res.status(500).json({ error: "Error login user" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
