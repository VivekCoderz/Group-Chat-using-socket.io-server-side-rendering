# Group Chat using Socket.io

A small real-time group chat room. An Express server serves a plain HTML/CSS/JS page from `public/`, and Socket.io carries messages between everyone connected.

## Features

- Enter a display name to join the room
- Messages are broadcast instantly to everyone in the room
- Your own messages and other people's messages are styled differently, with the sender's name shown on others' messages
- Live list and count of active users, updated when someone joins or leaves

There is no database: names and messages exist only while the server is running.

## Tech stack

- Node.js, Express 5
- Socket.io 4
- Vanilla HTML, CSS and JavaScript (served from `public/`)

## Run locally

```bash
npm install
npm start
```

Open http://localhost:4000 in two or more browser tabs, enter a name in each, and start chatting. Set the `PORT` environment variable to use a different port.

## Project structure

```
app.js            Express + Socket.io server
public/index.html Chat page
public/script.js  Client-side Socket.io logic
public/style.css  Styles
```
