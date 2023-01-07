const { ApolloServer, gql } = require("apollo-server");
const fs = require("fs");
const path = require("path");

// hacker news
let links = [
    {
        id: "link-0",
        description: "tutorial",
        url: "https://www.tutorial.com"
    }
];

// resolver func
const resolvers = {
    Query: {
        info: () => "HackerNews",
        feed: () => links,
    },
    Mutation: {
        post: (parent, args) => {
            let idCount = links.length;
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            };
            links.push(link);
            return link;
        }
    },
};

const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, "graphql/schema.graphql"), "utf-8"),
    resolvers,
});

server.listen().then(({ url }) => console.log(`${url}で起動中!`));