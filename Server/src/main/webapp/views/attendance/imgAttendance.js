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
        url: 'http://malsup.github.com/jquery.form.js',
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

    $('#studentName').html(user["name"] + " " + user["surname"]);
    $('#studentButtonName').html(user["name"] + " " + user["surname"]);
    $('#stuName').html(user["name"] + " " + user["surname"]);

    var img = document.getElementById("studentImage"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    var img = document.getElementById("studentImage2"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    var img = document.getElementById("studentImage3"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    document.getElementById("contentHeader").innerHTML = '<h1>' + course["id"] + " " + course["name"] + " / Section " + course["sectionId"] + '</h1>';

    $("#course-home-btn").click(function(){
        window.location.reload();
    });

    $("#courseID").val(course["id"]);
    $("#sectionNo").val(course["sectionId"]);

    jQuery("#upload-form").submit(function(e){
        //The following stops the form from redirecting
        e.preventDefault();
        document.getElementById('loading-gif').style.display = 'block';
        jQuery("#upload-form").ajaxSubmit({
            type: 'POST',
            url: 'http://localhost:8080/rest/upload/attendanceImage',
            data: jQuery('#upload-form').serialize(),
            success: function (msg) {
                //The data variable will contain the response data
                //if it's successful, you can no redirect wherever you want
                document.getElementById('loading-gif').style.display = 'none';
                window.location.href = "http://localhost:8080/templates/course/course-home.html";
            },
            error: function(msg) {

                $("#error_rgs_msg").html("<b style='color:red'>Fail...</b>");
            }
        });
    });

    $("#backToCourseHomePage").click(function(){
        window.location.replace("http://localhost:8080/templates/course/course-home.html");
    });
});