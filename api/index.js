import session from 'express-session';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import routes from'./routes/routes';
import { typeDefs } from'./models/gqSchema';
import { resolvers } from'./models/resolvers';
import { store } from'./utils/mongoose';
import { passport } from'./utils/passport';
import { corsOptions } from'./utils/cors';
import { sessionOptions } from'./utils/session';
import { User } from'./utils/mongoose';

const port = 5000
const app = express();

app
  .use(session({...sessionOptions, store}))
  .use(passport.initialize())
  .use(passport.session())
  .use(cors({...corsOptions}))
  .disable("x-powered-by");

routes(app, passport);

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: async ({ req }) =>  ({
        user: await User.findOne({_id: req?.session?.passport?.user || ""}).lean(), 
        logout: () => req.logout()
      })
});

server.applyMiddleware({ app, cors: false });

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}${server.graphqlPath}`));
