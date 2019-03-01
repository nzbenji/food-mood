
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('moods').del()
    .then(function () {
      // Inserts seed entries
      return knex('moods').insert([
        {id: 1, emotion_id: 1, meal_id: 1, note: 'I love this spaget!', time: '2019-03-01 14:00:45'},
        {id: 2, emotion_id: 3, meal_id: 2, note: 'This bread was gross', time: '2019-03-01 18:00:30'},
        {id: 3, emotion_id: 2, meal_id: 3, note: 'Yummy', time: '2019-03-01 20:00:10'}
      ]);
    });
};
