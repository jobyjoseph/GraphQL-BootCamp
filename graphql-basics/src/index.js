import {GraphQLServer} from "graphql-yoga";

// Type Definitions
const typeDefs = `
  type Query {
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    me() {
      return {
        id: '123',
        name: 'Joby',
        email: 'joby@gmail.com'
      }
    },
    post() {
      return {
        id: 'abc',
        title: 'This is post title',
        body: 'This is a great post',
        published: true
      }
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("The server is up!");
});