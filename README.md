# back-end

# Register and Login Endpoints

| Method | URL                | Requires                      | Description                                                                  |
| ------ | ------------------ | ----------------------------- | ---------------------------------------------------------------------------- |
| POST   | /api/auth/register | `username` `password`         | creates a user account using the information sent inside the `request body`  |
| POST   | /api/auth/login    | `username` `password` `token` | logs user into app                                                           |