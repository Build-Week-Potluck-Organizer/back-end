const db = require("../../data/dbconfig.js")

function createEvent(event) {
    return db('events').insert(event);
}

function getEvents() {
    return db('events')
}

function getEventById(event_id) {
    return db('events')
        .where({ event_id })
        .first()
}

function getEventFood(event_id) {
    return db('menus').where({ event_id })
}

function getEventGuests(id) {
    return db  
        .select('*')
        .from('guestlists')
        .where({ event_id: id })
}

function getLocation(id) {
    return db
        .select('*')
        .from('locations')
        .where({ event_id: id })
}

function addLocation(event_id, location) {
    return db('locations').insert({
        event_id,
        address: location.address
    })
}
// possible refactor due to strange preview return in TablePlus
function addFood(id, food) {
    return db('menus').insert({
        event_id: id, 
        dish: food.dish, 
        quantity: food.quantity,
        guest_name: food.guest_name,
        bringing: food.bringing,
    })
}
// possible refactor due to strange preview return in TablePlus
function addGuest(id, guest) {
    return db('guestlists').insert({
      event_id: id,
      username: guest.username,
      attending: guest.attending
    });
  }

function updateEvent(id, event) {
    return db('events')
        .where({ event_id: id })
        .update(event)
}

function updateLocation(id, location) {
    return db('locations')
        .where({ event_id: id })
        .update(location)
}

// doesn't update dish
function updateFood(id, food) {
    return db('menus')
        .where({ event_id: id })
        .andWhere(function() {
            this.where('dish', '=', food.dish)
        })
        .update(food)
}

function updateGuest(id, guest) {
    return db('guestlists')
        .where({ event_id: id })
        .andWhere(function() {
            this.where('username', '=', guest.username)
        })
        .update(guest)
}

function delEvent(id) {
    return db('events')
        .where({ event_id: id })
        .del()
}

function delFood(id, food) {
    return db('menus')
        .where({ event_id: id })
        .andWhere(function() {
            this.where('dish', '=', food)
        })
        .del()
}

function delGuest(id, user) {
    return db('guestlists')
        .where({ event_id: id }) 
        .andWhere(function() {
            this.where('username', '=', user)
        })
        .del()
}

module.exports = {
    createEvent,
    getEventById,
    getEventGuests,
    getEventFood,
    getLocation,
    addLocation,
    addFood,
    addGuest,
    updateEvent,
    getEvents,
    updateGuest,
    updateFood,
    updateLocation,
    delEvent,
    delFood,
    delGuest
}