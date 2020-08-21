const Hapi = require("hapi");
const Vision = require("vision");
const Ejs = require("ejs");
const Bell = require("bell");
require("dotenv").config();

const server = new Hapi.Server();

const db = require("./config/database");
const userRoute = require("./routes/user");
const movieRoute = require("./routes/movie");
const genereRoute = require("./routes/genere");

// Defining Server
server.connection({ port: process.env.PORT, host: "0.0.0.0", routes:{cors: true} });

// Regidtering Middlewares
server.register([Bell,Vision], (err) => {
  if (err) {
    throw err;
  }

  server.views({
    engines: { ejs: Ejs },
    relativeTo: __dirname,
    path: "views",
  });

  server.auth.strategy("github", "bell", {
    provider: "github",
    password: process.env.GITHUB_CLIENT_SECRET,
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    isSecure: false, // For development only
  });
});

// Starting server
const startServer = async () => {
  try {
    await db.authenticate();
    console.log("DB CONNECTED SUCCESSFULLY");
  } catch (error) {
    throw error;
  }
  await server.start((err) => {
    if (err) {
      throw err;
    }
    console.log(`SERVER RUNNING AT: ${server.info.uri}`);

    // Registering Routes
    server.register(userRoute, { routes: { prefix: "/api" } });
    server.register(movieRoute, { routes: { prefix: "/api" } });
    server.register(genereRoute, { routes: { prefix: "/api" } });
    server.route({
      method: "GET",
      path: "/",
      handler: (request, reply) => {
        reply.view("index")
      }
    })
  });
};

startServer();
