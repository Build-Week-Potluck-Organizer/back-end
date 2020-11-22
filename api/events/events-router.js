const express = require("express");
const Event = require("./events-model");
// const db = require('../../data/dbconfig');

const router = express.Router();

// get events
router.get('/', (req, res) => {
    Event.getEvents()
        .then(event => {
            res.status(200).json(event)
        })
        .catch(err => {
            res.status(500).json({
                message: 'events not found', error: err
            })
        })
})

// // get event by id 
// router.get('/:id', async (req, res, next) => {
//     try {
//       const event = await Event.getEventById(req.params.id)
//       res.json(event)
//     } catch(err) {
//         next(err)
//     }
//   })

// get event by id (extended form)
router.get('/:id', (req, res) => {
    Event.getEventById(req.params.id)
      .then(event => {
        Event.getEventGuests(req.params.id).then(guestlist => {
          Event.getLocation(req.params.id).then(location => {
            Event.getEventFood(req.params.id).then(food => {
              eventDetails = {
                event,
                guestlist,
                location,
                food
              };
              res.status(200).json(eventDetails);
            });
          });
        });
      })
      .catch(err => {
        res.status(500).json({ message: 'internal server error.', error: err });
      });
});

// get event guestlist by event id 
router.get('/:id/guestlist', (req, res) => {
    Event.getEventGuests(req.params.id)
        .then(guestlist => {
            res.status(200).json(guestlist)
        })
        .catch(err => {
            res.status(500).json({
                message: 'event guestlist not found', error: err
            })
        })
})

// get event location by event id 
router.get('/:id/location', (req, res) => {
    Event.getLocation(req.params.id)
        .then(location => {
            res.status(200).json(location)
        })
        .catch(err => {
            res.status(500).json({
                message: 'location not found', error: err
            })
        })
})

// get event menu by event id 
router.get('/:id/menu', (req, res) => {
    Event.getEventFood(req.params.id)
        .then(menu => {
            res.status(200).json(menu)
        })
        .catch(err => {
            res.status(500).json({
                message: 'event menu not found', error: err
            })
        })
})

// create new event 
router.post('/', (req, res) => {
    const newEvent = req.body;
    Event.createEvent(newEvent)
      .then(newEvent => {
        res.status(201).json(newEvent);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: "system error",
          newEvent,
          error: error     
        })
      })
})

// // create new event (async-await refactor)
// router.post('/', async (req, res, next) => {
//     console.log(req.body)
//     try {
//         const newEvent = await Event.createEvent(req.body)
//         return res.status(201).json({
//             message: 'event created',
//             newEvent
//         })
//     } catch(err) {
//         next(err)
//     }
// })

// add location to new event 
router.post('/:id/location', (req, res) => {
    Event.addLocation(req.params.id, req.body)
        .then((location) => {
            res.status(201).json({
                 message:'location added',
                 location
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'system error', error: err
            })
        })
})

// add guests to event guestlist 
router.post('/:id/guestlist', (req, res) => {
    Event.addGuest(req.params.id, req.body)
        .then(guest => {
            res.status(201).json({
                 message:'guest added',
                 guest
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'system error', error: err
            })
        })
})

// add item to event menu 
router.post('/:id/menu', (req, res) => {
    Event.addFood(req.params.id, req.body)
        .then((food) => {
            res.status(201).json({
                 message:'menu item added',
                 food
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'system error', error: err
            })
        })
})

// edit event 
router.put('/:id', (req, res) => {
    Event.updateEvent(req.params.id, req.body)
        .then((event) => {
            res.status(200).json({
                 message:'event edited',
                 event
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'system error', error: err
            })
        })
})

// edit menu item (doesn't edit dish property)
router.put('/:id/menu', (req, res) => {
    Event.updateFood(req.params.id, req.body)
        .then(food => {
            res.status(200).json({
                 message:'menu item edited',
                 food
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'system error', error: err
            })
        })
})

// edit guests  
router.put('/:id/guestlist', (req, res) => {
    Event.updateGuest(req.params.id, req.body)
        .then(guest => {
            res.status(200).json({
                 message:'guest edited',
                 guest
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'system error', error: err
            })
        })
})

// edit location 
router.put('/:id/location', (req, res) => {
    Event.updateLocation(req.params.id, req.body)
        .then(location => {
            res.status(200).json({
                 message:'location edited',
                 location
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'system error', error: err
            })
        })
})

// delete event 
router.delete('/:id', (req, res) => {
    Event.getEventById(req.params.id)
        .then(exEvent => {
            Event.delEvent(req.params.id)
                .then(event => {
                    if (event) {
                        res.status(204).json({
                            message: 'event deleted',
                            exEvent
                        })
                    } else {
                        res.status(404).json({
                            message: 'event not found'
                        })
                    }
                })
        })
        .catch(err => {
            res.status(500).json({
                message: 'system error', error: err
            })
        })
})

// delete menu item 
router.delete('/:id/menu', (req, res) => {
    Event.delFood(req.params.id, req.body.dish)
        .then(food => {
            if (food) {
                res.status(204).json({
                    message: 'menu item deleted',
                    food
                })
            } else {
                res.status(404).json({
                    message: 'menu item not found'
                })
            }
        }) 
        .catch(err => {
            res.status(500).json({
                message: 'system error',
                error: err
            })
        })
})

// delete guest 
router.delete('/:id/guestlist', (req, res) => {
    Event.delGuest(req.params.id, req.body.username)
        .then(guest => {
            if (guest) {
                res.status(204).json({
                    message: 'guest deleted',
                    guest
                })
            } else {
                res.status(404).json({
                    message: 'guest not found'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'system error',
                error: err
            })
        })
})

module.exports = router
