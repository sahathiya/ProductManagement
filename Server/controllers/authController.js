const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserRegistration = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ status: false, message: "All fields are required" });
  }
  const emailExist = await User.findOne({ email: email });
  if (emailExist) {
    return res.status(400).json({ message: "this email is already exist" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  await user.save();

  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.USER_SECRETKEY,
    { expiresIn: "1d" }
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res
    .status(200)
    .json({ status: true, message: "user successfully registered", user });
};

const UserLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "all fields are required" });
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "password is not match" });
  }

  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.USER_SECRETKEY,
    { expiresIn: "1d" }
  );
  res.cookie("token", token, {
    httpOnly: false,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res
    .status(200)
    .json({ status: "success", message: "login successful", user });
};

const UserLogout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({ message: "User Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};

module.exports = { UserRegistration, UserLogin, UserLogout };
