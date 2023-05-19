'use strict'

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({strapi}) {
    strapi.log.info('Creating standard roles:')

    const roles = ['Teacher', 'Supporter', 'Principal']

    for (const role of roles) {
      let teacherRole = await strapi.db
        .query('plugin::users-permissions.role')
        .findOne({
          where: {name: role},
        })

      if (!teacherRole) {
        teacherRole = await strapi.db
          .query('plugin::users-permissions.role')
          .create({
            data: {
              name: role,
              description: `The role for ${role}s`,
              type: role.toLowerCase(),
            },
          })
        strapi.log.info(`Created new role [${role}]`)
      } else {
        strapi.log.info(`Role [${role}] already exists.`)
      }
    }
  },
}
