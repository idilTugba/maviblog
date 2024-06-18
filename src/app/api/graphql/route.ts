import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "@/graphql/schema";
import { resolvers } from "@/graphql/resolvers";
import { createContext } from "@/graphql/context";
import dbConnect from "@/utils/dbconnect";
import { NextRequest } from "next/server";

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
