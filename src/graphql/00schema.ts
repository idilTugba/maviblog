import { gql } from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    fullname: String!
    password: String!
  }

  type BlogPost {
    id: ID!
    title: String!
    content: String!
    authorId: ID!
    createdAt: String!
    updatedAt: String!
    images: [String]
    videos: [String]
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    allPosts: [BlogPost]
    blogPost(id: ID!): BlogPost
    user(username: String!): User
    currentUser: User!
  }

  type Mutation {
    createBlogPost(
      title: String!
      content: String!
      images: [String]
      videos: [String]
    ): BlogPost
    login(username: String!, password: String!): AuthPayload
  }
`;
