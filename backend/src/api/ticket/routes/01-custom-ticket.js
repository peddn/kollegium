module.exports = {
  routes: [
    {
      // Path defined with an URL parameter
      method: 'GET',
      path: '/tickets/own',
      handler: 'ticket.own',
    },
  ],
}
