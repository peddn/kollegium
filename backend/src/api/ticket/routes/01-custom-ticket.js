module.exports = {
  routes: [
    {
      // Path defined with an URL parameter
      method: 'GET',
      path: '/tickets/own',
      handler: 'ticket.own',
    },
    {
      // Path defined with an URL parameter
      method: 'POST',
      path: '/tickets/external',
      handler: 'ticket.external',
    },
  ],
}
