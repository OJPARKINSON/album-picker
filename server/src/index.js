const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const routes = require('./routes/routes');
const cors = require('cors')
const { UsersSchema } = require('./models/models')

const PORT = process.env.PORT || 5000;
const app = express();
const User = mongoose.model('users', UsersSchema);

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/AlbumPicker', {
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

dotenv.config();

app.use(express.static('public'))
    .use(session({ secure: true, secret: 'keyboard cat', saveUninitialized: false, resave: false, store: new MongoStore({ mongooseConnection: mongoose.connection }) }))
    .use(cors())
    
routes(app);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));