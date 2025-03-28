require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./src/config/db');
const { connectCloudinary } = require('./src/config/cloudinary');
const eventsRoute = require('./src/api/routes/events');
const usersRoute = require('./src/api/routes/users');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();
connectCloudinary();

app.use('/api/v1/events', eventsRoute);
app.use('/api/v1/users', usersRoute);

app.use('*', (req, res, next) => {
  return res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Internal Server Error' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
