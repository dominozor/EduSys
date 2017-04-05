/**
 * Created by enver on 4/5/17.
 */
$(document).ready(function(){

    $.getScript("/views/utility/sha256.js", function(){}); //sha256.js is imported

    $.ajax({
        url: '/views/eduUser/eduUser.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    $.ajax({
        url: '/views/WS/websocket.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    $.ajax({
        url: '/views/utility/utility.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    user = JSON.parse(readCookie('mainuser'));
    var notification = JSON.parse(window.localStorage.getItem("notification")); // Retrieving
    wsSendMessage("££"+notification.toString());
    var types=["Message","Information","Warning"];
    $('#type').html(types[notification["type"]-1]);
    $('#sender').html(notification["sender"]);
    $('#date').html(notification["date"].substr(0, 4) +" / "+ notification["date"].substr(4, 2)+" / "+notification["date"].substr(6, 2));
    $('#time').html(notification["date"].substr(8));
    var text=notification["message"].split("\n");
    for(var i=0;i<text.length;i++){
        $('#text').append('<p>'+text[i]+'</p>');
    }




    $("#backPage").click(function(){
        var backLink = JSON.parse(window.localStorage.getItem("backLink")); // Retrieving
        window.location.replace(backLink); //redirects back to lecturer page
    });
});
