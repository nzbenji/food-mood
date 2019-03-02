exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('moods').del()
    .then(function () {
      // Inserts seed entries
      return knex('moods').insert([
        {id: 1, emotion_id: 77001, meal_id: 1, notes: 'I love this spaget!', time: '2019-03-01 14:00:45'},
        {id: 2, emotion_id: 77002, meal_id: 2, notes: 'This bread was gross', time: '2019-03-01 18:00:30'},
        {id: 3, emotion_id: 77003, meal_id: 3, notes: 'Yummy', time: '2019-03-01 20:00:10'},
        {id: 4, emotion_id: 77001, meal_id: 1, notes: 'groos spaget', time: '2019-03-01 14:50:45'},
        {id: 5, emotion_id: 77002, meal_id: 2, notes: 'This bread was abc', time: '2019-03-01 18:10:30'},
        {id: 6, emotion_id: 77003, meal_id: 3, notes: 'yum', time: '2019-03-01 20:06:10'}
      ])
    })
}
