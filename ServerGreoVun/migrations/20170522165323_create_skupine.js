exports.up = function(knex, Promise) {

      return knex.schema.createTable('skupine', function (table) {
        table.increments();
        table.string('ime').notNullable();
        table.integer('tkUporabnikId').references('id').inTable('uporabniki').notNullable();
        table.timestamps();
    })
};

exports.down = function(knex, Promise) {
      return knex.schema.dropTable('skupine');
};