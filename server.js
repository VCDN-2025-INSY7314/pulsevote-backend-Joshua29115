const mongoose = require('mongoose');
const app = require('./app');
const https = require('https');
const fs = require('fs');
require('dotenv').config();

const PORT = process.env.PORT || 5001;

const options = {
  key: fs.readFileSync('ssl/key.pem'),
  cert: fs.readFileSync('ssl/cert.pem'),
};

console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    https.createServer(options, app).listen(PORT, () => {
    console.log('Server running at https://localhost:' + PORT);
    });
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});