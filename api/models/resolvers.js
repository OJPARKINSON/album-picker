const resolvers = {
    Query: {
        Link: () => `https://accounts.spotify.com/authorize?show_dialog=true&response_type=code&redirect_uri=http://localhost:3000/callback&client_id=${process.env.client_id}`,
        currentUser: (parent, args, context) => context.getUser(),
    }
};

module.exports = {
    resolvers
}