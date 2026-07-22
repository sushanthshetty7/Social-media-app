const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");


// Register
router.post("/register", async (req, resp) => {
  try {
    const { username, email, password } = req.body;

    // Validate request
    if (!username || !email || !password) {
      return resp.status(400).json({
        message: "Username, email and password are required",
      });
    }

    // Check existing email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return resp.status(409).json({
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save user
    const user = await newUser.save();

    // Remove password
    const { password: userPassword, ...userData } = user._doc;

    return resp.status(201).json(userData);
  } catch (err) {
    console.error("REGISTER ERROR:", err);

    return resp.status(500).json({
      message: "Internal server error",
    });
  }
});

// Login
router.post("/login", async (req, resp) => {
  try {
    const { email, password } = req.body;

    // Validate request
    if (!email || !password) {
      return resp.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return resp.status(404).json({
        message: "User not found",
      });
    }

    // Compare password
    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return resp.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Remove password before sending user
    const { password: userPassword, ...userData } = user._doc;

    return resp.status(200).json(userData);
  } catch (err) {
    console.error("LOGIN ERROR:", err);

    return resp.status(500).json({
      message: "Internal server error",
    });
  }
});

module.exports = router;
