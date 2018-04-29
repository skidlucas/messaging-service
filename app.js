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

const connectedUsers = {};

// Listen on every connection
io.on("connection", (socket) => {

    // Listen for setting the username of the client
    socket.on("setUsername", (data) => {
        socket.username = data.username;
        connectedUsers[data.username] = socket.id;
        console.log(connectedUsers)
    });

    // Listen for the list of users
    socket.on("listUsers", () => {
        io.sockets.connected[socket.id].emit("listUsers", {'users': connectedUsers});
    })

    // Listen for new messages
    socket.on("newMessage", (data) => {
        let recipientSocketID = connectedUsers[data.recipient];
        if (recipientSocketID){
            // if the client tries to send a message to himself, display an error message
            if (recipientSocketID === socket.id){
                io.sockets.connected[socket.id].emit("sameUserAndRecipient");
            } else {
                io.sockets.connected[socket.id].emit("newMessage", {'message': data.message, 'username': socket.username, 'recipient': data.recipient});
                io.sockets.connected[recipientSocketID].emit("newMessage", {'message': data.message, 'username': socket.username, 'recipient': data.recipient});
            }
        } else {
            io.sockets.connected[socket.id].emit("unknownRecipient", {'recipient': data.recipient});
        }
    });
});