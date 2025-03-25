const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../../api/models/User');
const usersData = require('../../data/usersData');
require('dotenv').config();

const initUsersSeed = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await User.deleteMany({});

    const updatedUsers = usersData.map((user) => {
      user.password = bcrypt.hashSync(user.password, 10);
      return user;
    });

    await User.insertMany(updatedUsers);
  } catch (error) {
    console.error('Error al insertar usuarios:', error.message);
  } finally {
    await mongoose.disconnect();
  }
};

initUsersSeed();
