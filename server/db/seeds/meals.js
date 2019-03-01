
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('meals').del()
    .then(function () {
      // Inserts seed entries
      return knex('meals').insert([
        {id: 1, user_id: 1, title: 'spaget', time: '2019-03-01 14:00:45'},
        {id: 2, user_id: 1, title: 'bread', time: '2019-03-01 18:00:30'},
        {id: 3, user_id: 1, title: 'pizza', time: '2019-03-01 20:00:10'}
      ]);
    });
};
