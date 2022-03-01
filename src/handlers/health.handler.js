const healthHandler = async (req, res) => {
  res.json({
    message: 'Server is up!',
  }).status(200);
};

module.exports = {
  healthHandler,
};
