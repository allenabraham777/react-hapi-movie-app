const Joi = require("joi");
exports.register = (server, options, next) => {
  server.route(userRoutes);
};

const userRoutes = [
  {
    method: ["GET", "POST"],
    path: "/login",
    config: {
      auth: {
        mode: "try",
        strategy: "github",
      },
      plugins: {
        "hapi-auth-cookie": {
          redirectTo: false,
        },
      },
    },
    handler: (request, reply) => {
      if (!request.auth.isAuthenticated) {
        return reply.view("error", { err: request.auth.error.message });
      }
      // console.log("CRED", request.auth.credentials);
      request.cookieAuth.set({ token: request.auth.credentials.token });
      reply.redirect("http://localhost:3001/movies");
    },
  },
  {
    method: ["GET", "POST"],
    path: "/logout",
    handler: (request, reply) => {
      // console.log("CRED", request.auth.credentials);
      request.cookieAuth.clear();
      reply.redirect("http://localhost:3001");
    },
  },
];

exports.register.attributes = {
  name: "user",
};
