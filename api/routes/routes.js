const routes = (app, passport) => {

  app.get('/login', 
    passport.authenticate('spotify', {
        scope: ['user-read-private user-read-playback-state streaming user-read-email user-read-private user-read-currently-playing']
    }),
    
  );

  app.get('/callback',
    passport.authenticate('spotify', { failureRedirect: 'http://localhost:3000/#error' }),
    function(req, res) {
        res.redirect('http://localhost:3000/AlbumPicker');
    }
  )
};

module.exports = routes;