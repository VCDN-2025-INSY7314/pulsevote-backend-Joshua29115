const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (userId, role) =>  // Updated: Now takes role parameter
  jwt.sign({ id: userId, role }, process.env.JWT_SECRET, { expiresIn: "1h" });  // Include role in token payload

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({ email, password });
    const token = generateToken(user._id, user.role);  // Pass user.role
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id, user.role);  // Pass user.role
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};