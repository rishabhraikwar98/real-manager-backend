const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
dotenv.config();
connectDB();

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

const { authenticate } = require("./middleware/authMiddleware");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/projects", authenticate, projectRoutes);
app.use("/api/v1", authenticate, taskRoutes);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
