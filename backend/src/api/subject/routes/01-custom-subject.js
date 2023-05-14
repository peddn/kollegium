module.exports = {
  routes: [
    {
      // Path defined with an URL parameter
      method: "GET",
      path: "/subjects/own",
      handler: "subject.own",
    },
  ],
};
