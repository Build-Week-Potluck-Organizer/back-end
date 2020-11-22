const db = require("../../data/dbconfig.js")

async function createEvent(event) {
    const [event_id] = await db('events').insert(event).returning("event_id");
    return getEventById(event_id);
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

async function addLocation(event_id, location) {
    const newLocation = {
        event_id,
        address: location.address
    }
    await db('locations').where({ event_id }).insert(newLocation)
    return getLocation(event_id)
}

async function addFood(event_id, food) {
    const newFood = {
        event_id, 
        dish: food.dish, 
        quantity: food.quantity,
        guest_name: food.guest_name,
        bringing: food.bringing,
    }
    await db('menus').where({ event_id }).insert(newFood)
    return getEventFood(event_id)
}

async function addGuest(event_id, guest) {
    const newGuest = {
        event_id,
        username: guest.username,
        attending: guest.attending
    }
    await db('guestlists').where({ event_id }).insert(newGuest)
    return getEventGuests(event_id)
}

async function updateEvent(event_id, event) {
    await db('events').where({ event_id }).update(event)
    return getEventById(event_id)
}

async function updateLocation(event_id, location) {
    await db('locations').where({ event_id }).update(location)
    return getLocation(event_id)
}

// doesn't update dish
async function updateFood(event_id, food) {
    await db('menus').where({ event_id, dish: food.dish }).update(food)
    return getEventFood(event_id)
}

// doesn't update username (i.e. guest)
async function updateGuest(event_id, guest) {
    await db('guestlists').where({ event_id, username: guest.username }).update(guest)
    return getEventGuests(event_id)
}

function delEvent(event_id) {
    return db('events').where({ event_id }).del()
}

function delFood(event_id, food) {
    return db('menus').where({ event_id, dish: food }).del()
}

function delGuest(event_id, user) {
    return db('guestlists').where({ event_id, username: user }).del()
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