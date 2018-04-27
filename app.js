/**
 * Simple messaging application
 * @author: Lucas Martinez
 */

const PORT = 30000;

const express = require("express");
const app = express();

// Set ejs as view engine (HTML pages will be served from folder 'views')
app.set("view engine", "ejs");

// Serve static files from folder 'public'
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index")
});

server = app.listen(PORT);

const io = require("socket.io")(server);

// Listen on every connection
io.on("connection", (socket) => {

    // Listen for setting the username of the client
    socket.on("setUsername", (data) => {
        console.log(data.username);
        socket.username = data.username;
    });

    // Listen for new messages
    socket.on("newMessage", (data) => {
        // todo : broadcast so far; change to unicast if the user is already connected to the server else drop the msg
        io.sockets.emit("newMessage", {message: data.message, username: socket.username});
    });
});