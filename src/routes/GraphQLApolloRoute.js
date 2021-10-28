const {ApolloServer} = require("apollo-server-express");
const {mergeTypeDefs, mergeResolvers} = require('@graphql-tools/merge');
const schemas = require("../schemas");
const {Logger} = require("../core");
const log = Logger("app:route:graphql_apollo_route");

module.exports = class GraphQLApolloRoute {
    static async map(app) {
        const server = new ApolloServer({
            typeDefs: mergeTypeDefs(schemas.typeDefs),
            resolvers: mergeResolvers(schemas.resolvers),
        })
        await server.start();
        // Additional middleware can be mounted at this point to run before Apollo.
        // app.use("*", jwtCheck, requireAuth, checkScope);
        // Mount Apollo middleware here.
        server.applyMiddleware({app: app, path: "/graphQL"});
        log.debug(`Apollo listening on ${server.graphqlPath}`);
        return server;
    }
};
