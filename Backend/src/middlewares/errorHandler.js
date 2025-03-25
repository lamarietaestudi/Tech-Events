const errorHandler = (res, error, status = 500) => {
  res.status(status).json({ message: error.message });
};

module.exports = { errorHandler };
