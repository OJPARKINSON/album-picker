const session = require('express-session');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const { ApolloServer } = require('apollo-server-express');

const routes = require('./routes/routes')
const { typeDefs } = require('./models/gqSchema');
const { resolvers } = require('./models/resolvers');
const { store } = require('./utils/mongoose');
const { passport } = require('./utils/passport');
const { corsOptions } = require('./utils/cors')
const { sessionOptions } = require('./utils/session')


const port = 5000
const app = express();

app
  .use(session({...sessionOptions, store}))
  .use(passport.initialize())
  .use(passport.session())
  .use(bodyParser())
  .use(cors({...corsOptions}))
  .disable("x-powered-by");

routes(app, passport);

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: ({ req }) => ({ req })
});

server.applyMiddleware({ app, cors: false });

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}${server.graphqlPath}`))