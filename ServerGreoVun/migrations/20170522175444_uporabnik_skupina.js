exports.up = function(knex, Promise) {

      return knex.schema.createTable('uporabnik_skupina', function (table) {
        table.increments();
        table.integer('status').notNullable();
        table.integer('tkSkupinaId').references('id').inTable('skupine').notNullable();
        table.integer('tkUporabnikId').references('id').inTable('uporabniki').notNullable();
        table.timestamps();
    })
};

exports.down = function(knex, Promise) {
      return knex.schema.dropTable('uporabnik_skupina');
};