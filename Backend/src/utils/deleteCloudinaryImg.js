const cloudinary = require('cloudinary').v2;

const deleteCloudinaryImage = async (urlImage) => {
  try {
    const cloudinaryId = urlImage.split('/').pop();

    if (cloudinaryId) {
      await cloudinary.uploader.destroy(cloudinaryId);
      return;
    }
  } catch (error) {
    console.error('Error al eliminar imagen de Cloudinary:', error);
    throw error;
  }
};

module.exports = deleteCloudinaryImage;
