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
    console.log("connected")
});