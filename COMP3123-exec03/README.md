# COMP3123 Class Exercise 03

## Run locally

Open a terminal in this folder and run `npm start`. The HTTP server uses the Node.js core API and runs without an install step. It listens at `http://localhost:8081` by default. Set the `PORT` environment variable to use a different port.

| Method | Path | Response |
| --- | --- | --- |
| GET | `/` | Welcome message in HTML |
| GET | `/employee` | All four employee records in JSON |
| GET | `/employee/names` | Full names in ascending order as a JSON array |
| GET | `/employee/totalsalary` | JSON object with `total_salary` equal to `23500` |

An unknown GET path returns 404. Other HTTP methods return 405 with an `Allow: GET` header.

The `screenshots` folder shows the four successful responses and both error responses.
