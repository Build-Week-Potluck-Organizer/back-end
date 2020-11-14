exports.up = async function(knex) {
    await knex.schema.createTable('users', table => {
      table.increments()
      table.string('username', 30).unique().notNullable()
      table.string('password', 30).notNullable()
    })
  
    await knex.schema.createTable('event', table => {
      table.increments('event_id')
      table.string('event_name', 50).notNullable()
      table.string('description', 500)
      table
        .integer('organizer_id')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.date('date').notNullable()
      table.time('time').notNullable()
    })
  
    await knex.schema.createTable('location', table => {
      table
        .integer('event_id')
        .references('event_id')
        .inTable('event')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('address', 100).notNullable()
    });
  
    await knex.schema.createTable('potluck_guest', table => {
      table.increments('guest_id')
      table
        .string('username')
        .references('username')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('event_id')
        .references('event_id')
        .inTable('event')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table.boolean('going').defaultTo(null)
    });
  
    await knex.schema.createTable('event_food_list', table => {
      table
        .integer('event_id')
        .references('event_id')
        .inTable('event')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table.string('recipe_name').notNullable()
      table.integer('quantity').defaultTo(1)
      table
        .string('guest_name')
        .references('username')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .defaultTo(null);
      table.boolean('being_brought').defaultTo(false)
    })
  }
  
  exports.down = async function(knex, Promise) {
    await knex.schema.dropTableIfExists('users')
    await knex.schema.dropTableIfExists('event')
    await knex.schema.dropTableIfExists('location')
    await knex.schema.dropTableIfExists('potluck_guest')
    await knex.schema.dropTableIfExists('food')
    await knex.schema.dropTableIfExists('event_food_list')
  }
  