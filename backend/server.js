import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import scheduleRoutes from "./routes/scheduleRoutes.js";
import garbageTrackerRoutes from "./routes/garbageTrackerRoutes.js";
import authorityRoutes from "./routes/authorityRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import helpRoutes from "./routes/helpRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Middleware to attach SECRET_KEY to request object
app.use((req, res, next) => {
  req.SECRET_KEY = SECRET_KEY;
  next();
});

// Routes

app.use("/api/users", userRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/tracker", garbageTrackerRoutes);
app.use("/api/authority", authorityRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/help", helpRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
