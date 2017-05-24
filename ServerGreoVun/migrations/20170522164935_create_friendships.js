exports.up = function(knex, Promise) {

      return knex.schema.createTable('friendships', function (table) {
        table.increments();
        table.integer('user_id').references('id').inTable('uporabniki').notNullable();
        table.integer('friend_id').references('id').inTable('uporabniki').notNullable();
        table.integer('status').notNullable();
        table.timestamps(true, true);
    })
};

exports.down = function(knex, Promise) {
      return knex.schema.dropTable('friendships');
};
