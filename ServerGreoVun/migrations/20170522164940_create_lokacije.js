exports.up = function(knex, Promise) {

      return knex.schema.createTable('lokacije', function (table) {
        table.increments();
        table.double('dolzina').notNullable();
        table.double('sirina').notNullable();
        table.timestamps();
    })
};

exports.down = function(knex, Promise) {
      return knex.schema.dropTable('lokacije');
};