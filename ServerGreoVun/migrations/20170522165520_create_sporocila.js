exports.up = function(knex, Promise) {

      return knex.schema.createTable('sporocila', function (table) {
        table.increments();
        table.string('tekst').notNullable();
        table.integer('tkSkupinaId').references('id').inTable('skupine').notNullable();
        table.integer('tkUporabnikId').references('id').inTable('uporabniki').notNullable();
        table.timestamps();
    })
};

exports.down = function(knex, Promise) {
      return knex.schema.dropTable('sporocila');
};