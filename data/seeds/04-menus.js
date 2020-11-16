exports.seed = async function(knex) {
  await knex('menus').insert([
    { 
      event_id: 1, 
      dish: 'apple pie', 
      quantity: 1,
      guest_name: 'fulana',
      bringing: true,
    },
    { 
      event_id: 2, 
      dish: 'soda bread', 
      quantity: 2,
      guest_name: 'fulana',
      bringing: true,
    },
    { 
      event_id: 3, 
      dish: 'caramel apples', 
      quantity: 6,
      guest_name: 'fulano',
      bringing: true,
    },
    { 
      event_id: 4, 
      dish: 'cranberry sauce', 
      quantity: 1,
      guest_name: 'fulano',
      bringing: true,
    },
  ])
}