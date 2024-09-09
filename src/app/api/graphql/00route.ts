// import { ApolloServer } from '@apollo/server';
// import { startServerAndCreateNextHandler } from '@as-integrations/next';
// import { typeDefs } from '@/graphql/schema';
// import { resolvers } from '@/graphql/resolvers';
// import jwt from 'jsonwebtoken';

// const apolloServer = new ApolloServer({ typeDefs, resolvers });

// const getUserFromToken = (token: string | undefined | null) => {
//   try {
//     if (token) {
//       return jwt.verify(token.substring(7), process.env.JWT_SECRET as string);
//     }
//     return null;
//   } catch (error) {
//     return null;
//   }
// };

// export const api = {
//   bodyParser: false,
// };

// const handler = startServerAndCreateNextHandler(apolloServer, {
//   context: async (req) => {
//     console.log('Request Headers:', req.headers);

//     const token = req ? req.headers['authorization'] ?? null : null;

//     console.log('Token:', token);

//     const user = getUserFromToken(token);
//     console.log('User:', user);

//     return { user };
//   },
// });

// export { handler as GET, handler as POST };
