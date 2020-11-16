# back-end

# register and login Endpoints:

| Method | URL                | Requires                      | Description                                                                  |
| ------ | ------------------ | ----------------------------- | ---------------------------------------------------------------------------- |
| POST   | /api/auth/register | `username` `password`         | creates a user account using the information sent inside the `request body`  |
| POST   | /api/auth/login    | `username` `password` `token` | logs user into app                                                           |

# POST login data returned:

{
  "message": "Welcome, fulana!",
  "username": "fulana",
  "id": 2,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE2MDU1NDk5ODV9.O62hHFijS7s_WE1mzX3JBt8ina3PerHDGVKjMLsUjlA"
}

# users endpoints:

| Method | URL                   | Requires                   | Description                                                                  |
| ------ | --------------------- | -------------------------- | ---------------------------------------------------------------------------- |
| GET    | /api/users/           | `token`                    | returns all users                                                            |
| GET    | /api/users/:id        | `token`                    | returns a given user by their `id`                                           |
| GET    | /api/users/:id/events | `token`                    | returns a given user's events by their `id`                                  |

# get-users data returned:

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

# get-user-by-id data returned:

{
  "id": 1,
  "username": "fulano",
  "password": "$2a$08$KhAyzK5CsYUfmWW2lPtlHOxwbi59fsHGRZLX06cEKk/CpXO/lxmWW"
}

# get-user's-events-by-id data returned

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
