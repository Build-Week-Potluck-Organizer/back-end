exports.seed = async function(knex) {
  await knex('guestlists').insert([
    { 
      username: 'fulana', 
      event_id: 1, 
      attending: true,
    },
    { 
      username: 'fulana', 
      event_id: 2, 
      attending: true,
    },
    { 
      username: 'fulano', 
      event_id: 3, 
      attending: true,
    },
    { 
      username: 'fulano', 
      event_id: 4, 
      attending: true,
    },
  ])
}