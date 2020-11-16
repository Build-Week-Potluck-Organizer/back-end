exports.seed = async function(knex) {
  await knex('locations').insert([
    { 
      event_id: 1, 
      address: '1066 Hastings Street, Anytown, ME 12345',
    },
    { 
      event_id: 2, 
      address: '1066 Hastings Street, Anytown, ME 12345',
    },
    { 
      event_id: 3, 
      address: '1571 Lepanto Avenue, Somewhere, MO 54321',
    },
    { 
      event_id: 4, 
      address: '1571 Lepanto Avenue, Somewhere, MO 54321',
    },
  ])
}