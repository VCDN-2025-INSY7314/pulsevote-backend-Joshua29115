const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

//app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173', // Match your frontend's dev server URL
  optionsSuccessStatus: 200 // Some browsers require this for older APIs
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('PulseVote API running!');
});

module.exports = app;

app.get('/test', (req, res) => {
  res.json({ message: 'Test JSON from backend' });
});