const upload = require('../../middlewares/file');
const usersRoute = require('express').Router();
const { isAuth, isAdmin } = require('../../middlewares/auth');
const {
  getUsers,
  getUserByEmail,
  postUser,
  updateUser,
  deleteUser
} = require('../controllers/users');

usersRoute.get('/', isAuth, isAdmin, getUsers);
usersRoute.get('/:email', isAuth, isAdmin, getUserByEmail);
usersRoute.post('/', upload.single('avatar'), postUser);
usersRoute.put('/:id', isAuth, upload.single('avatar'), updateUser);
usersRoute.delete('/:id', isAuth, deleteUser);

module.exports = usersRoute;
