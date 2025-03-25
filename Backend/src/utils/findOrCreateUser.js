const User = require('../api/models/User');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');

const findOrCreateUser = async ({ username, email, password, rol, avatar }) => {
  if (!email || !password) {
    throw new Error('El email y la contraseña son obligatorios');
  }

  let user = await User.findOne({ email });

  if (user) {
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      throw new Error('Contraseña incorrecta');
    }

    const token = generateToken(user._id);
    return { message: 'Login realizado con éxito', user, token };
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({
    email,
    password: hashedPassword,
    username: username || email.split('@')[0] || null,
    avatar: avatar || null,
    rol: rol || 'user'
  });

  user = await newUser.save();
  const token = generateToken(user._id);
  return { message: 'Registro y acceso correctos', user, token };
};

module.exports = findOrCreateUser;
