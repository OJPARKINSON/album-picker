const sessionOptions = {
    secret: process.env.SESSION_SECRECT,
    resave: true,
    saveUninitialized: false,
}

module.exports = {
    sessionOptions
}