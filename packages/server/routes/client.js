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
        // console.log(request.cookieAuth.sid);
        // if (request.cook)
        if (!request.auth.isAuthenticated) return reply.view("index");
      },
    },
    {
      method: "GET",
      path: "/movies",
      // config: {
      //   auth: {
      //     strategy: "session",
      //     mode: "try",
      //   },
      // },
      handler: (request, reply) => {
        reply.view("index");
      },
    },
    {
      method: "GET",
      path: "/movies/add",
      handler: (request, reply) => {
        reply.view("index");
      },
    },
    {
      method: "GET",
      path: "/movies/edit/{id}",
      handler: (request, reply) => {
        reply.view("index");
      },
    },
    {
      method: "GET",
      path: "/movies/generes/add",
      handler: (request, reply) => {
        reply.view("index");
      },
    },
  ]);
};

exports.register.attributes = {
  name: "restricted",
};
