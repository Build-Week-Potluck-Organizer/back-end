exports.up = async function(knex) {
    await knex.schema.createTable('users', table => {
      table.increments()
      table.string('username').unique().notNullable()
      table.string('password').notNullable()
    })
  
    await knex.schema.createTable('events', table => {
      table.increments('event_id')
      table.string('event_name').notNullable()
      table.string('description', 500)
      table
        .integer('organizer_id')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('date').notNullable()
      table.string('time').notNullable()
    })
  
    await knex.schema.createTable('locations', table => {
      table
        .integer('event_id')
        .references('event_id')
        .inTable('events')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('address').notNullable()
    });
  
    await knex.schema.createTable('guestlists', table => {
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
        .inTable('events')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table.boolean('attending').defaultTo(null)
    });
  
    await knex.schema.createTable('menus', table => {
      table
        .integer('event_id')
        .references('event_id')
        .inTable('events')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table.string('dish').notNullable()
      table.integer('quantity').defaultTo(1)
      table
        .string('guest_name')
        .references('username')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .defaultTo(null);
      table.boolean('bringing').defaultTo(false)
    })
  }
  
  exports.down = async function(knex, Promise) {
    await knex.schema.dropTableIfExists('menus')
    await knex.schema.dropTableIfExists('guestlists')
    await knex.schema.dropTableIfExists('locations')
    await knex.schema.dropTableIfExists('events')
    await knex.schema.dropTableIfExists('users')
  }
  