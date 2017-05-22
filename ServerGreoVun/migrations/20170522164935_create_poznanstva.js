exports.up = function(knex, Promise) {

      return knex.schema.createTable('poznanstva', function (table) {
        table.increments();
        table.integer('tkIdUporabnik1').references('id').inTable('uporabniki').notNullable();
        table.integer('tkIdUporabnik2').references('id').inTable('uporabniki').notNullable();
        table.integer('status').notNullable();
        table.timestamps();
    })
};

exports.down = function(knex, Promise) {
      return knex.schema.dropTable('poznanstva');
};
