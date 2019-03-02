exports.up = function (knex, Promise) {
  return knex.schema.createTable('moods', table => {
    table.increments('id').primary()
    table.integer('emotion_id').references('emotions.id')
    table.integer('meal_id').references('meals.id')
    table.string('notes')
    table.timestamp('time').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('moods')
}
