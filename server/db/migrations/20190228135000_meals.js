exports.up = function (knex, Promise) {
  return knex.schema.createTable('meals', table => {
    table.increments('id').primary()
    table.integer('user_id').references('users.id')
    table.string('title')
    table.timestamp('time').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('meals')
}
