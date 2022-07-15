function errorHandler(err, req, res, next) {
  if (err.status === 413) {
    return res.status(413).json({
      message: 'File too large',
      statusCode: err.status,
    });
  }

  return res.status(500).json({
    message: err.message,
    statusCode: 500,
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    return res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

module.exports = { errorHandler, boomErrorHandler };
