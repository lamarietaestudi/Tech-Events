const User = require('../models/User');
const bcrypt = require('bcrypt');
const findOrCreateUser = require('../../utils/findOrCreateUser');
const errorHandler = require('../../middlewares/errorHandler');
const cloudinary = require('cloudinary').v2;

const getUsers = async (req, res, next) => {
  try {
    if (req.user.rol !== 'admin') {
      return res.status(403).json({
        message: 'No tienes permisos para acceder a esta información.'
      });
    }
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return errorHandler(res, error);
  }
};

const getUserByEmail = async (req, res, next) => {
  try {
    if (req.user.rol !== 'admin') {
      return res
        .status(403)
        .json({ message: 'No tienes permisos para realizar esta operación' });
    }
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return errorHandler(res, error);
  }
};

const postUser = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const avatar = req.file?.path;

    const result = await findOrCreateUser({
      email,
      password,
      username,
      avatar: avatar
    });

    return res.status(200).json(result);
  } catch (error) {
    return errorHandler(res, error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user.rol !== 'admin' && req.user._id.toString() !== id) {
      return res
        .status(403)
        .json({ message: 'No tienes permisos para realizar esta operación' });
    }

    const userToUpdate = await User.findById(id);
    if (!userToUpdate) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    if (req.file) {
      const publicId = userToUpdate.avatar?.split('/').pop().split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`users/${publicId}`);
      }

      const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
        folder: 'users'
      });
      req.body.avatar = cloudinaryResult.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    return errorHandler(res, error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user.rol !== 'admin' && req.user._id.toString() !== id) {
      return res
        .status(403)
        .json({ message: 'No tienes permisos para realizar esta operación' });
    }

    const userToDelete = await User.findById(id);
    if (!userToDelete) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (userToDelete.avatar) {
      const publicId = userToDelete.avatar.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`users/${publicId}`);
    }

    await User.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ message: 'Usuario eliminado correctamente.', userToDelete });
  } catch (error) {
    return errorHandler(res, error);
  }
};

module.exports = {
  getUsers,
  getUserByEmail,
  postUser,
  updateUser,
  deleteUser
};
