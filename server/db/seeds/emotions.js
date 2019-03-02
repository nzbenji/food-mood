exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('emotions').del()
    .then(function () {
      // Inserts seed entries
      return knex('emotions').insert([
        {id: 77001, emoji: '😀', ranking: 1},
        {id: 77002, emoji: '🤮', ranking: 5},
        {id: 77003, emoji: '😞', ranking: 3}
      ])
    })
}
