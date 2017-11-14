var knex = require('./knex')

module.exports = {
  signIn: function(user) {
    return knex('my_user')
    .select('*').where('agentName', user).first()
  },
  signUp: function(agentName, password) {
    return knex('my_user').insert({agentName, password})
  }
}
