exports.seed = async function(knex) {
  await knex('events').insert([
    { 
      event_name: '4th of July BBQ', 
      description: 'informal get-together, B.Y.O.B., etc.', 
      organizer_id: 1, 
      date: 'July 4th, 2021',
      time: '12:00 PM'
    },
    { 
      event_name: 'St. Patrick\'s Day Party', 
      description: 'informal get-together, B.Y.O.B., etc.', 
      organizer_id: 1, 
      date: 'March 17th, 2021',
      time: '5:30 PM'
    },
    { 
      event_name: 'Halloween Party', 
      description: 'informal get-together, B.Y.O.B., etc.', 
      organizer_id: 2, 
      date: 'October 31st, 2021',
      time: '6:00 PM'
    },
    { 
      event_name: 'Thanksgiving Potluck', 
      description: 'informal get-together, B.Y.O.B., etc.', 
      organizer_id: 2, 
      date: 'November 25th, 2021',
      time: '7:00 PM'
    },
  ])
}

