exports.register = (server, options, next) => {
  server.route(userRoutes);
};

const userRoutes = [
  {
    method: "GET",
    path: "/login",
    config: {
      auth: {
        mode: "try",
        strategy: "github",
      },
    },
    handler: (request, reply) => {
      if (!request.auth.isAuthenticated) {
        return reply.view('error', { err: request.auth.error.message });
      }

      reply.redirect('/');
    },
  },
];

exports.register.attributes = {
  name: "user",
};
