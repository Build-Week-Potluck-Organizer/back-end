const supertest = require('supertest')
const server = require('../api/server')
const db = require('../data/dbconfig')
require('dotenv').config();

const token1 = process.env.TOKEN_1

describe('events integeration tests', () => {

    const delete_guest = {
        username: 'fulano'
    }

    const delete_menu_item = {
        dish: 'caramel apples'
    }

    const new_event_data = {
        event_name: 'Block Party',
        description: 'neighborhood get-together',
        date: 'September 15th, 2021',
        time: '12:00 pm'
    }

    const new_event_location = {
        address: '1942 Midway Place, Fortuna, CA 67890'
    }

    const new_event_guest = {
        username: 'fulana',
        attending: true
    }

    const new_menu_item = {
        dish: 'cheese log',
        guest_name: 'fulana'
    }

    const event_edit = {
        event_name: 'St. Patrick\'s Day Party',
        description: 'informal get-together, B.Y.O.B., etc.',
        date: 'March 17th, 2021',
        time: '5:00 pm'
    }

    const location_edit = {
        address: '1415 Agin Court, Surprise, NV 13579'
    }

    const guest_edit = {
        username: 'fulana',
        attending: false
    }

    const menu_item_edit = {
        dish: 'soda bread',
        guest_name: 'fulana',
        bringing: false
    }

    // get events
    it('GET /api/events', async () => {
        const res = await supertest(server)
            .get('/api/events')
            .set('Authorization', token1)
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe('application/json')
        expect(res.body).toHaveLength(4)
    })

    // get event by event id
    it('GET /api/events/:id', async () => {
        const res = await supertest(server)
          .get('/api/events/1')
          .set('Authorization', token1)
          expect(res.statusCode).toBe(200)
          expect(res.type).toBe('application/json')
          expect(res.body.event.event_name).toBe('4th of July BBQ')
    })

    // get event guestlist by event id
    it('GET /api/events/:id/guestlist', async () => {
        const res = await supertest(server)
          .get('/api/events/1/guestlist')
          .set('Authorization', token1)
          expect(res.statusCode).toBe(200)
          expect(res.type).toBe('application/json')
          expect(res.body[0].username).toBe('fulana')
    })

    // get event location by event id
    it('GET /api/events/:id/location', async () => {
        const res = await supertest(server)
          .get('/api/events/1/location')
          .set('Authorization', token1)
          expect(res.statusCode).toBe(200)
          expect(res.type).toBe('application/json')
          expect(res.body[0].address).toBe('1066 Hastings Street, Anytown, ME 12345')
    })

    // get event menu by event id
    it('GET /api/events/:id/menu', async () => {
        const res = await supertest(server)
          .get('/api/events/1/menu')
          .set('Authorization', token1)
          expect(res.statusCode).toBe(200)
          expect(res.type).toBe('application/json')
          expect(res.body[0].dish).toBe('apple pie')
    })

    // delete event by event id 
    it('DELETE /api/events/:id', async () => {
        const res = await supertest(server)
          .delete('/api/events/4')
          .set('Authorization', token1)
          expect(res.statusCode).toBe(204)
    })

    // delete non-existent event 
    it('DELETE /api/events/:id', async () => {
        const res = await supertest(server)
          .delete('/api/events/100')
          .set('Authorization', token1)
          expect(res.statusCode).toBe(404)
          expect(res.body.message).toBe('event not found')
    })

    // delete event guest by event id / guest username 
    it('DELETE /api/events/:id/guestlist', async () => {
        const res = await supertest(server)
                .delete('/api/events/3/guestlist')
                .send(delete_guest)
                .set('Authorization', token1)
            expect(res.statusCode).toBe(204)
    })

    // delete event menu item by event id 
    it('DELETE /api/events/:id/menu', async () => {
        const res = await supertest(server)
                .delete('/api/events/3/menu')
                .send(delete_menu_item)
                .set('Authorization', token1)
            expect(res.statusCode).toBe(204)
    })

    // post new event 
    it('POST /api/events', async () => {
        const res = await supertest(server)
            .post('/api/events')
            .send(new_event_data)
            .set('Authorization', token1)
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe('application/json')
        expect(res.body.event_name).toBe('Block Party')
    })

    // post new location 
    it('POST /api/events/:id/location', async () => {
        const res = await supertest(server)
            .post('/api/events/1/location')
            .send(new_event_location)
            .set('Authorization', token1)
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe('application/json')
        expect(res.body.location[1].address).toBe('1942 Midway Place, Fortuna, CA 67890')
    })

    // post new guest 
    it('POST /api/events/:id/guestlist', async () => {
        const res = await supertest(server)
            .post('/api/events/1/guestlist')
            .send(new_event_guest)
            .set('Authorization', token1)
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe('application/json')
        expect(res.body.guest[1].username).toBe('fulana')
        expect(res.body.guest[1].attending).toBe(1) // the integer '1' being equal to the Boolean 'true'
        // NOTE: The integer-for-Boolean phenomenon seen above on line 177 applies to the 'testing' environment 
        // and is switched in the 'development' environment (which requires a Boolean rather than a binary integer for the test to pass).
        // To switch between the 'testing' and 'development' environments see /data/dbconfig.js, lines 4-9.
    })

    // post new menu item
    it('POST /api/events/:id/menu', async () => {
        const res = await supertest(server)
            .post('/api/events/1/menu')
            .send(new_menu_item)
            .set('Authorization', token1)
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe('application/json')
        expect(res.body.food[1].dish).toBe('cheese log')
        expect(res.body.food[1].guest_name).toBe('fulana')
    })

    // edit event by id event id 
    it('PUT /api/events/:id', async () => {
        const res = await supertest(server)
            .put('/api/events/2')
            .send(event_edit)
            .set('Authorization', token1)
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe('application/json')
        expect(res.body.event.time).toBe('5:00 pm')
    })

    // edit location 
    it('PUT /api/events/:id/location', async () => {
        const res = await supertest(server)
            .put('/api/events/2/location')
            .send(location_edit)
            .set('Authorization', token1)
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe('application/json')
        expect(res.body.location[0].address).toBe('1415 Agin Court, Surprise, NV 13579')
    })

    // edit guest
    it('PUT /api/events/:id/guestlist', async () => {
        const res = await supertest(server)
            .put('/api/events/2/guestlist')
            .send(guest_edit)
            .set('Authorization', token1)
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe('application/json')
        expect(res.body.guest[0].attending).toBe(0) // the integer '0' being equal to the Boolean 'false'
        // NOTE: The integer-for-Boolean phenomenon seen above on line 225 applies to the 'testing' environment 
        // and is switched in the 'development' environment (which requires a Boolean rather than a binary integer for the test to pass).
        // To switch between the 'testing' and 'development' environments see /data/dbconfig.js, lines 4-9.
    })

    // edit menu item 
    it('PUT /api/events/:id/menu', async () => {
        const res = await supertest(server)
            .put('/api/events/2/menu')
            .send(menu_item_edit)
            .set('Authorization', token1)
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe('application/json')
        expect(res.body.food[0].bringing).toBe(0) // the integer '0' being equal to the Boolean 'false'
         // NOTE: The integer-for-Boolean phenomenon seen above on line 239 applies to the 'testing' environment 
        // and is switched in the 'development' environment (which requires a Boolean rather than a binary integer for the test to pass).
        // To switch between the 'testing' and 'development' environments see /data/dbconfig.js, lines 4-9.
    })
})
