const axios = require('axios');
const mongoose = require('mongoose');
const { UsersSchema } = require('../models/models')
const User = mongoose.model('users', UsersSchema);

const index = async (req, res) => {
    
    if (req.session.passport) {
        let users = await User.findOne({ _id: req.session.passport.user.id}).lean()
        return axios({
            url: 'https://api.spotify.com/v1/me/playlists ',
            method: 'get',
            headers: {
            Authorization: `Bearer ${users.accessToken}`,
            Accept: 'application/json',
            },
        })
        .then(response => {
            return res.send(response.data)
        })
        .catch(error => {
            return res.send(error);
        })
    }

};

const checkAuth = (req, res, next) => {
    User.find({ _id: req.session.passport.user.id}, (err, user) =>{
        err ? res.sendStatus(500) : next()
    })
}

module.exports = { 
    index,
    checkAuth
}