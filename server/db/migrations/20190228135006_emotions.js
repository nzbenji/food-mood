exports.up = function (knex, Promise) {
  return knex.schema.createTable('emotions', table => {
    table.increments('id').primary()
    table.integer('ranking')
    table.string('emoji')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('emotions')
}
