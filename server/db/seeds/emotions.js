
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('emotions').del()
    .then(function () {
      // Inserts seed entries
      return knex('emotions').insert([
        {id: 77001, emoji: '&fx1F922', ranking: 1},
        {id: 77002, emoji: '&fx1F600', ranking: 5},
        {id: 77003, emoji: '&fx1F612', ranking: 3}
      ]);
    });
};
