const Joi = require("joi");
exports.register = (server, options, next) => {
  server.route(userRoutes);
};

const userRoutes = [
  {
    method: ["GET", "POST"],
    path: "/login",
    config: {
      plugins: { "hapi-auth-cookie": { redirectTo: false } },
      auth: { strategy: "github", mode: "try" },
    },
    handler: (request, reply) => {
      if (!request.auth.isAuthenticated) {
        return reply.view("error", { err: request.auth.error.message });
      }

      request.cookieAuth.set({ token: request.auth.credentials.token });
      return reply.redirect("/movies");
    },
  },
  {
    method: ["GET", "POST"],
    path: "/logout",
    handler: (request, reply) => {
      
      request.cookieAuth.clear();
      reply.redirect("http://localhost:3001");
    },
  },
];

exports.register.attributes = {
  name: "user",
};
