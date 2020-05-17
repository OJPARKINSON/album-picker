const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5000/graphql'],
  credentials: true,
};

module.exports = {
    corsOptions
}