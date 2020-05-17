const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require("connect-mongodb-session")(session);
const { UsersSchema, MusicSchema } = require('../models/mongoSchema')

var store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/AlbumPicker',
    collection: "sessions"
});

store.on("error", function(error) {
    console.log(error);
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/AlbumPicker', {
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const User = mongoose.model('User', UsersSchema);
const Music = mongoose.model('Music', MusicSchema);

module.exports = {
    store,
    mongoose,
    User,
    Music
}