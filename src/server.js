const { ApolloServer, gql } = require("apollo-server");
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

// resolver func
const resolvers = {
    Query: {
        info: () => "HackerNews",
    },
    Mutation: {
        post: (parent, args, context) => {
            const newLink = context.prisma.link.create({
                data: {
                    url: args.url,
                    description: args.description,
                },
            });
            return newLink;
        },
    },
};

const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, "graphql/schema/schema.graphql"), "utf-8"),
    resolvers,
    context: {
        prisma,
    },
});

server.listen().then(({ url }) => console.log(`${url}で起動中!`));