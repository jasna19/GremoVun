exports.up = function(knex, Promise) {

      return knex.schema.createTable('locations', function (table) {
        table.increments();
        table.double('latitude').notNullable();
        table.double('longitude').notNullable();
        table.integer('user_id').references('id').inTable('users').notNullable().unique();
        table.timestamps(true, true);
    })
};

exports.down = function(knex, Promise) {
      return knex.schema.dropTable('locations');
};