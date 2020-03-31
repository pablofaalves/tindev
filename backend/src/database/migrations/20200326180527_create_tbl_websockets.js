
exports.up = function(knex) {
  return knex.schema.createTable('websockets', function (table) {
      table.string('userId').primary();
      table.string('socketId').notNullable();
      table.timestamp('creation_timestamp').notNullable();
  });
};

exports.down = function(knex) {
    return knex.schema.createTable('websockets');
};
