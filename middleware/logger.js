const logger = (req, res, next) => {
  console.log(`${req.method} http://${req.get('host')}${req.originalUrl}`);
  next();
};

export { logger };
