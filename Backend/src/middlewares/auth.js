const User = require('../api/models/User');
const { verifyToken } = require('../utils/jwt');

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      console.error('Error: Token no proporcionado.');
      return res.status(401).json({ message: 'No autorizado.' });
    }

    const parsedToken = token.replace('Bearer ', '');
    const { id } = verifyToken(parsedToken);
    const user = await User.findById(id);

    if (!user) {
      console.error('Error: Usuario no encontrado.');
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    user.password = null;
    req.user = user;

    next();
  } catch (error) {
    console.error('Error en autenticación:', error.message);
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (!req.user || req.user.rol !== 'admin') {
      return res
        .status(403)
        .json({ message: 'Se requieren privilegios de administrador.' });
    }
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Operación no autorizada', error: error.message });
  }
};

module.exports = { isAuth, isAdmin };
