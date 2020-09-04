exports.register = (server, options, next) => {
  server.route([
    {
      method: "GET",
      path: "/",
      config: {
        plugins: {
          "hapi-auth-cookie": {
            redirectTo: false,
          },
        },
        auth: {
          strategy: "session",
          mode: "try",
        },
      },
      handler: (request, reply) => {
        if (request.auth.isAuthenticated) return reply.redirect("/movies");

        return reply.view("index", { title: "Please Login" });
      },
    },
    {
      method: "GET",
      path: "/movies",
      handler: (request, reply) => {
        reply.view("index", { title: "Movies" });
      },
    },
    {
      method: "GET",
      path: "/movies/add",
      handler: (request, reply) => {
        reply.view("index", { title: "Add Movie" });
      },
    },
    {
      method: "GET",
      path: "/movies/edit/{id}",
      config:{auth: false},
      handler: (request, reply) => {
        reply.view("index", { title: "Edit Movie" });
      },
    },
    {
      method: "GET",
      path: "/generes/add",
      handler: (request, reply) => {
        reply.view("index", { title: "Add Genere" });
      },
    },
  ]);
};

exports.register.attributes = {
  name: "restricted",
};
