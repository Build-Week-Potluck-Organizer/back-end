# back-end

# register and login Endpoints:

| Method | URL                | Requires                      | Description                                                                  |
| ------ | ------------------ | ----------------------------- | ---------------------------------------------------------------------------- |
| POST   | /api/auth/register | `username` `password`         | creates a user account using the information sent inside the `request body`  |
| POST   | /api/auth/login    | `username` `password` `token` | logs user into app                                                           |

# POST login data returned:

```js
{
  "message": "Welcome, fulana!",
  "username": "fulana",
  "id": 2,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE2MDU1NDk5ODV9.O62hHFijS7s_WE1mzX3JBt8ina3PerHDGVKjMLsUjlA"
}
```

# users endpoints:

| Method | URL                   | Requires                   | Description                                                                  |
| ------ | --------------------- | -------------------------- | ---------------------------------------------------------------------------- |
| GET    | /api/users/           | `token`                    | returns all users                                                            |
| GET    | /api/users/:id        | `token`                    | returns a given user by their `id`                                           |
| GET    | /api/users/:id/events | `token`                    | returns a given user's events by their `id`                                  |

# get-users data returned:

```js
[
  {
    "id": 1,
    "username": "fulano",
    "password": "$2a$08$KhAyzK5CsYUfmWW2lPtlHOxwbi59fsHGRZLX06cEKk/CpXO/lxmWW"
  },
  {
    "id": 2,
    "username": "fulana",
    "password": "$2a$08$tGXmUAGmTQ.dN3o.Krj.WeRP99ZqMg39cT2JhUY/5s.wYFdSzh6Z2"
  }
]
```

# get-user-by-id data returned:

```js
{
  "id": 1,
  "username": "fulano",
  "password": "$2a$08$KhAyzK5CsYUfmWW2lPtlHOxwbi59fsHGRZLX06cEKk/CpXO/lxmWW"
}
```

# get-user's-events-by-user-id data returned

```js
[
  {
    "username": "fulano",
    "event_name": "4th of July BBQ"
  },
  {
    "username": "fulano",
    "event_name": "St. Patrick's Day Party"
  }
]
```

# events endpoints:

| Method | URL                       | Requires                   | Description                                                              |
| ------ | ------------------------- | -------------------------- | ------------------------------------------------------------------------ |
| GET    | /api/events/              | `token`                    | returns all events                                                       |
| GET    | /api/events/:id           | `token`                    | returns a given event by its `id`                                        |
| GET    | /api/events/:id/guestlist | `token`                    | returns a given event's guestlist by event `id`                          |
| GET    | /api/events/:id/location  | `token`                    | returns a given event's location by event `id`                           |
| GET    | /api/events/:id/menu      | `token`                    | returns a given event's menu by event `id`                               |
| DELETE | /api/events/:id           | `token`                    | deletes a given event by its `id`                                        |
| DELETE | /api/events/:id/guestlist | guest's `username` `token` | deletes a given event guest by event `id` and guest `username`           |
| DELETE | /api/events/:id/menu      | name of `dish` `token`     | deletes a given dish by event `id` and name of `dish`                    |

# get-events data returned:

```js
[
  {
    "event_id": 1,
    "event_name": "4th of July BBQ",
    "description": "informal get-together, B.Y.O.B., etc.",
    "organizer_id": 1,
    "date": "July 4th, 2021",
    "time": "12:00 PM"
  },
  {
    "event_id": 2,
    "event_name": "St. Patrick's Day Party",
    "description": "informal get-together, B.Y.O.B., etc.",
    "organizer_id": 1,
    "date": "March 17th, 2021",
    "time": "5:30 PM"
  },
  {
    "event_id": 3,
    "event_name": "Halloween Party",
    "description": "informal get-together, B.Y.O.B., etc.",
    "organizer_id": 2,
    "date": "October 31st, 2021",
    "time": "6:00 PM"
  },
  {
    "event_id": 4,
    "event_name": "Thanksgiving Potluck",
    "description": "informal get-together, B.Y.O.B., etc.",
    "organizer_id": 2,
    "date": "November 25th, 2021",
    "time": "7:00 PM"
  }
]
```

# get-event-by-id data returned:

```js
{
  "event": {
    "event_id": 3,
    "event_name": "Halloween Party",
    "description": "informal get-together, B.Y.O.B., etc.",
    "organizer_id": 2,
    "date": "October 31st, 2021",
    "time": "6:00 PM"
  },
  "guestlist": [
    {
      "guest_id": 3,
      "username": "fulano",
      "event_id": 3,
      "attending": true
    }
  ],
  "location": [
    {
      "event_id": 3,
      "address": "1571 Lepanto Avenue, Somewhere, MO 54321"
    }
  ],
  "food": [
    {
      "event_id": 3,
      "dish": "caramel apples",
      "quantity": 6,
      "guest_name": "fulano",
      "bringing": true
    }
  ]
}
```

# get-event-guestlist-by-event-id data returned:

```js
[
  {
    "guest_id": 3,
    "username": "fulano",
    "event_id": 3,
    "attending": true
  }
]
```

# get-event-location-by-event-id data returned:

```js
[
  {
    "event_id": 2,
    "address": "1066 Hastings Street, Anytown, ME 12345"
  }
]
```

# get-even-menu-by-event-id data returned:

```js
[
  {
    "event_id": 2,
    "dish": "soda bread",
    "quantity": 2,
    "guest_name": "fulana",
    "bringing": true
  }
]
```
#