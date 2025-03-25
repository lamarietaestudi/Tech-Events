const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    try {
      const folderName = `TechEvents/${req.user?.username || 'default'}`;
      return {
        folder: folderName,
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif']
      };
    } catch (error) {
      console.error('Error al definir parámetros de Cloudinary:', error);
      throw error;
    }
  }
});

const upload = multer({ storage });

module.exports = upload;
