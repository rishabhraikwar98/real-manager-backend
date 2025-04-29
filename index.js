const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
dotenv.config();
connectDB()

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser())


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/projects",projectRoutes);
// Start server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
