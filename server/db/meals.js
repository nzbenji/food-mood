const connection = require('./index')


module.exports = {
    userMeals
  }
function userMeals (db = connection) {
    return db('meals')
    .join('users', 'user_id', 'users.id')
    .where('user_id', id)
}
