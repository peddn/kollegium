module.exports = {
  routes: [
    {
      // Path defined with an URL parameter
      method: "GET",
      path: "/groups/own",
      handler: "group.own",
    },
    {
      // Path defined with an URL parameter
      method: "GET",
      path: "/groups/own/:id",
      handler: "group.ownId",
    },
  ],
};
