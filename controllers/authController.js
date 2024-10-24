const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user.js");
const dotenv = require("dotenv");

dotenv.config();

exports.register = async (req, res) => {
  const { email, password, firstName, lastName, isAdmin } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      isAdmin,
    });
    res.status(201).json({
      status: 201,
      data: { email, isAdmin },
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
};