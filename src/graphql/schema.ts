import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String!
  }

  type BlogPost {
    id: ID!
    title: String!
    content: String!
    authorId: ID!
    images: [String]
    videos: [String]
  }

  type Query {
    blogPosts: [BlogPost]
    blogPost(id: ID!): BlogPost
  }

  type Mutation {
    createBlogPost(
      title: String!
      content: String!
      images: [String]
      videos: [String]
    ): BlogPost
    login(username: String!, password: String!): String
  }
`;
