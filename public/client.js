const HOST = "localhost";
const PORT = "30000";

$(function(){
    let socket = io.connect("http://" + HOST + ":" + PORT);

    let elemUsername = $("#inputUsername");
    let elemMessage = $("#inputMessage");
    let elemRecipient = $("#inputRecipient");
    let elemMessages = $("#divMessages");
    let username;
    let message;

    // When Log In is clicked, hide the Log In div and display the Chat
    $("#btnLogin").click(function(){
        username = elemUsername.val();
        if (username){
            // send the nickname chosen to the server
            socket.emit("setUsername", {'username': username});
            $("#divLogin").hide();
            $("#usernameMessage").text("You are connected as " + username + ".");
            elemMessages.empty()
            $("#divChat").show();
            elemRecipient.val("");
            elemMessage.val("");
        }
    });

    $("#btnDisconnect").click(function(){
        $("#divChat").hide();
        $("#divLogin").show();
        socket.emit("btnDisconnect");
    });

    // when ENTER is pressed, send the message
    elemMessage.bind("enterKey", function(){
        message = elemMessage.val();

        // if the client writes /users, return the list of connected users
        if (message === "/users"){
            socket.emit("listUsers");
            elemMessage.val('');
        } else {
            let recipient = elemRecipient.val();

            if (message && recipient){
                socket.emit("newMessage", {'recipient': recipient, 'message': message});
                elemRecipient.val('');
                elemMessage.val('');
            }
        }
    });

    // bind ENTER with 'enterKey'
    elemMessage.keyup(function(e){
        if(e.keyCode === 13) {
            $(this).trigger("enterKey");
        }
    });

    //Listen for new messages
    socket.on("newMessage", (data) => {
        if (data.username === username){
            elemMessages.append("<p class='ownMessage'>You[" + data.recipient +"]: " + data.message + "</p>");
        } else {
            elemMessages.append("<p class='otherMessage'>" + data.username + ": " + data.message + "</p>");
        }

    });

    //Listen for the list of users
    socket.on("listUsers", (data) => {
        let listUsers = "";
        for (let user in data.users){
            listUsers += user + ", "
        }
        listUsers = listUsers.slice(0, -2); // slices the last 2 characters
        elemMessages.append("<p class='listUsers'>Connected users: " + listUsers + "</p>");
    });

    // Listen for username already used
    socket.on("usernameUsed", () => {
        $("#divChat").hide();
        $("#divLogin").show();
        $("#usedUsername").show();
        $("#usernameMessage").text("Username already used.");
    });

    // Listen for unknown recipients
    socket.on("unknownRecipient", (data) => {
        elemMessages.append("<p class='error'>" + data.recipient + " is not connected. </p>");
        elemMessage.val(message);
    });

    // Listen for the user trying to talk to himself
    socket.on("sameUserAndRecipient", () => {
        elemMessages.append("<p class='error'>You are trying to talk to yourself. Are you OK ?</p>");
        elemMessage.val(message);
    });
});