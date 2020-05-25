import mongoose from 'mongoose';
import session from 'express-session';
import { UsersSchema, AlbumSchema, TrackSchema, ArtistSchema } from '../models/mongoSchema';
const MongoDBStore = require("connect-mongodb-session")(session);

export var store = new MongoDBStore({
        uri: 'mongodb://localhost:27017/AlbumPicker',
        collection: "sessions"
    }).on("error", (error) => console.log(error));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/AlbumPicker', {
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export const User = mongoose.model('User', UsersSchema);
export const Album = mongoose.model('Album', AlbumSchema);
export const Artist = mongoose.model('Artist', ArtistSchema);