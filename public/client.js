const HOST = "localhost";
const PORT = "30000";

$(function(){
    var socket = io.connect("http://" + HOST + ":" + PORT);
});