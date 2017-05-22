exports.up = function (knex, Promise) {
    return knex.schema.createTable('uporabniki', function (table) {
        table.increments();
        table.string('uporabniskoIme').notNullable();
        table.string('geslo').notNullable();
        table.string('ePosta').notNullable();
        table.timestamps();
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('uporabniki');
};