/**
 * Created by enver on 4/12/17.
 */
$(window).on('load', function() {
    // Animate loader off screen
    $(".myModal2").fadeOut("slow");
});

$(document).ready(function() {

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

    var course = JSON.parse(readCookie('course'));
    var user = JSON.parse(readCookie('mainuser'));

    var img = document.getElementById("studentImage"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    var img = document.getElementById("studentImage2"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    var img = document.getElementById("studentImage3"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    $("#course-home-btn").click(function(){
        window.location.reload();
    });

    $(function() {
        $('#upload-form').ajaxForm({
            success: function(msg) {
                if(msg){
                    var backLink = JSON.parse(window.localStorage.getItem("backLink")); // Retrieving
                    window.location.replace(backLink);
                }

            },
            error: function(msg) {
                $("#upload-error").text("Couldn't upload file");
            }
        });
    });

    $("#backPage").click(function(){
        var backLink = JSON.parse(window.localStorage.getItem("backLink")); // Retrieving
        window.location.replace(backLink); //redirects back to lecturer page
    });
});