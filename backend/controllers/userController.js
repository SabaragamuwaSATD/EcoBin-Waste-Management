import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const tokenBlacklist = new Set();

// Registration route
export const UserRegistration = async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).send("User registered");
  } catch (error) {
    res.status(400).send("Error registering user");
  }
};

// Login route
export const UserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
      req.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } else {
    res.status(401).send("Invalid credentials");
  }
};

// Logout route
export const UserLogout = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  tokenBlacklist.add(token);
  res.status(200).send("User logged out");
};

// Middleware to check if token is blacklisted
export const checkTokenBlacklist = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (tokenBlacklist.has(token)) {
    return res.status(401).send("Token is invalid");
  }
  next();
};
