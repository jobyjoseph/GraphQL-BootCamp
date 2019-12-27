import {GraphQLServer} from "graphql-yoga";

const users = [
  {
    id: '1',
    name: 'Joby',
    email: 'joby@gmail.com'
  },
  {
    id: '2',
    name: 'Mary',
    email: 'mary@gmail.com'
  }
];

const posts = [
  {
    id: "1",
    title: "Babys day out",
    body: "Baby is everywhere",
    published: true,
    author: "1"
  },
  {
    id: "2",
    title: "Hello world",
    body: "Google says hello",
    published: true,
    author: "2"
  }
];

// Type Definitions
const typeDefs = `
  type Query {
    me: User!
    post: Post!
    greeting(name: String): String!
    grades: [Int!]!
    add(numbers: [Int!]!): Int!
    users(query: String): [User!]!
    posts(query: String): [Post!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
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
    },
    greeting(parent, args) {
      return `Hello ${args.name}`;
    },
    grades(parent, args, ctx, info) {
      return [66, 89, 99];
    },
    add(parent, args, ctx, info) {
      return args.numbers.reduce((a, b) => {
        return a + b;
      })
    },
    users(parent, args, ctx, info) {

      if(!args.query) {
        return users;
      }
      
      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    posts(parent, args, ctx, info) {
      if(!args.query)
        return posts;

      return posts.filter(item => {
        return item.title.toLowerCase().includes(args.query.toLowerCase());
      })
    }
  },
  Post: {
    author(parent, args, ctx, info){
      return users.find((user) => {
        return user.id === parent.author;
      });
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.find((post) => {
        return posts.author === parent.id
      });
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