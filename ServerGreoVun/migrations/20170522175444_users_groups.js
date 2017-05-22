exports.up = function(knex, Promise) {

      return knex.schema.createTable('users_groups', function (table) {
        table.increments();
        table.integer('status').notNullable();
        table.integer('group_id').references('id').inTable('groups').notNullable();
        table.integer('user_id').references('id').inTable('users').notNullable();
        table.timestamps();
    })
};

exports.down = function(knex, Promise) {
      return knex.schema.dropTable('users_groups');
};