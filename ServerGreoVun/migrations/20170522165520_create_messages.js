exports.up = function(knex, Promise) {

      return knex.schema.createTable('messages', function (table) {
        table.increments();
        table.string('text').notNullable();
        table.integer('group_id').references('id').inTable('groups').notNullable();
        table.integer('user_id').references('id').inTable('users').notNullable();
        table.timestamps(true, true);
    })
};

exports.down = function(knex, Promise) {
      return knex.schema.dropTable('messages');
};