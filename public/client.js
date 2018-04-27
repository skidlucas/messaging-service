const HOST = "localhost";
const PORT = "30000";

$(function(){
    $("#divChat").hide();
    var socket = io.connect("http://" + HOST + ":" + PORT);

    var elemUsername = $("#inputUsername");
    var elemMessage = $("#textMessage");
    var username;

    // When Log In is clicked, hide the Log In div and display the Chat
    $("#btnLogin").click(function(){
        username = elemUsername.val();
        if (username){
            // send the nickname chosen to the server
            socket.emit("setUsername", {'username': username});
            $("#divLogin").hide();
            $("#divChat").show()
        }
    });

    // when ENTER is pressed, send the message
    elemMessage.bind("enterKey", function(){
        var message = elemMessage.val();
        socket.emit("newMessage", {'message': message});
    });

    // bind ENTER with 'enterKey'
    elemMessage.keyup(function(e){
        if(e.keyCode === 13) {
            $(this).trigger("enterKey");
        }
    });

    //Listen for new messages
    socket.on("newMessage", (data) => {
        $("#divMessages").append("<p class='message'>" + data.username + ": " + data.message + "</p>");
    })
});