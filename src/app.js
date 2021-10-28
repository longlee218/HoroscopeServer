const { Server, Environment, debugStream, winstonStream } = require("./core");

// Import all express libs
const morgan = require("morgan");
const cors = require("cors");

// Import all routes
const { GraphQLApolloRoute } = require("./routes");

// Create a new express app
const app = Server.init();

// Enable cors for all routes and origins
app.use(cors());

// Setup header
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Adds winston logger to the express framework
app.use(morgan("dev", debugStream));
app.use(morgan("combined", winstonStream));

// Apollo server route
Promise.allSettled([GraphQLApolloRoute.map(app)])
    .then(() => {
        // Starts the server and listens for common errors
        Server.run(app, Environment.getConfig().server.port);
    });
