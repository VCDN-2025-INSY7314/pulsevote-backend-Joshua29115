const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const authRoutes = require("./routes/authRoutes");
const { protect } = require("./middleware/authMiddleware");

dotenv.config();

const app = express();

//app.use(helmet());
app.use(cors({
  origin: 'https://localhost:5173', // Match your frontend's dev server URL
  optionsSuccessStatus: 200 // Some browsers require this for older APIs
}));
app.use(express.json());

app.use(cors({
  origin: "https://localhost:5173",
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('PulseVote API running!');
});

module.exports = app;

app.get('/test', (req, res) => {
  res.json({ message: 'Test JSON from backend' });
});

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: `Welcome, user ${req.user.id}! You have accessed protected data.`,
    timestamp: new Date()
  });
});

app.use("/api/auth", authRoutes);