
const { index, checkAuth } = require('../controllers/controller');

const routes = (app, passport) => {
  app.get('/', (req, res) => {
    index(req, res);
  });

  app.get('/auth/spotify', (req, res) => {
      res.send(`https://accounts.spotify.com/authorize?show_dialog=true&response_type=code&redirect_uri=http://localhost:3000/callback&client_id=${process.env.client_id}`)
  });

  app.post('/callback', (req, res) => {
      // Successful authentication, redirect home.
      console.log()
      res.redirect(301, 'http://localhost:3000/AlbumPicker');
    }
  );

  app.get('/playlist-picker', (req, res) => {
    return index(req, res);
  })

};

module.exports = routes;