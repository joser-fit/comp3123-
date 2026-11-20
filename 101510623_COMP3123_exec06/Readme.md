# Week06 Exercise - Notes Application

Build a Restful CRUD API for a simple Note-Taking application using Node.js, Express and MongoDB.

## Steps to Setup

1. Install dependencies

```bash
npm install
```
2. Fix error and write Note API code

3. Run Server

```bash
node server.js
```

4. Optionally implement Docker OR vercel Hosting

5. Test all API on Postman and take screenshots at  URL <http://localhost:8081>

## Sample Note Payload

```json
{
    "content" : {
        "noteTitle": "Sample Note Title",
        "noteDescription": "Sample Note Description",
        "priority": "HIGH",
        "dateAdded": "06/Oct/2025",
        "dateUpdated": "06/Oct/2025"
    }
}
```

## Run locally on Windows

Start the MongoDB service if it is stopped. Open PowerShell in the folder containing
`package.json` and run:

```powershell
npm ci
npm start
```

The app uses `mongodb://127.0.0.1:27017/week06_notes` by default. For Atlas,
set `$env:DB_URL` to your own connection string before running `npm start`.
The app starts listening after it connects to MongoDB.
Open <http://localhost:8081/> to check the welcome page.

## Test in Postman

Import `Week06-Notes.postman_collection.json`. Keep the server running and send
the requests in order. The Create request saves the returned `_id` as the
collection variable `noteId`. For a manual request, copy that value into the
URL where you see `{{noteId}}`. Capture the method, URL, response status, and
response body for each CRUD screenshot.

| Request | URL path | Expected status |
| --- | --- | --- |
| Create a note | `POST /notes` | 201 Created |
| List notes | `GET /notes` | 200 OK |
| Read one note | `GET /notes/{{noteId}}` | 200 OK |
| Update the note | `PUT /notes/{{noteId}}` | 200 OK |
| Delete the note | `DELETE /notes/{{noteId}}` | 200 OK |
| Confirm deletion | `GET /notes/{{noteId}}` | 404 Not Found |

POST and PUT use the JSON `content` wrapper shown above. Both require a title,
description, and priority (`HIGH`, `MEDIUM`, or `LOW`). Dates are optional.
When omitted, the API sets both dates on creation and refreshes `dateUpdated`
on update. The original `dateAdded` is preserved. MongoDB dates are returned
in ISO format.
