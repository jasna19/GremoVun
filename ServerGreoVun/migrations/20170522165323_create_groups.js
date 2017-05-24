exports.up = function(knex, Promise) {

      return knex.schema.createTable('groups', function (table) {
        table.increments();
        table.string('name').notNullable().unique();
        table.integer('user_id').references('id').inTable('users').notNullable();
        table.timestamps(true, true);
    })
};

exports.down = function(knex, Promise) {
      return knex.schema.dropTable('groups');
};