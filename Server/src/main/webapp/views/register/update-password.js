/**
 * Created by Onat1 on 17/04/2017.
 */
$(window).on('load', function() {
    // Animate loader off screen
    $(".myModal2").fadeOut("slow");
});

$(document).ready(function() {

    var courseList, courseListObj;
    var user;
    var htmlString = "";
    //First eduUser.js and utility.js is imported to admin-home.js
    $.ajax({
        url: '/views/main/main.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    $.ajax({
        url: '/views/eduUser/eduUser.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    $.ajax({
        url: '/views/utility/utility.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    $.getScript("/views/utility/sha256.js", function(){});

    $.ajax({
        url: '/views/WS/websocket.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    user = JSON.parse(readCookie('mainuser'));
    wsSendMessage(user["id"]);
    var img = document.getElementById("studentImage"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    var img = document.getElementById("studentImage2"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    var img = document.getElementById("studentImage3"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    /*var img = document.getElementById("studentImage4"); //This puts the profile picture of the student to the home page.
     img.src = String(user["ppic"]);*/

    $('#studentName').html(user["name"] + " " + user["surname"]);
    $('#studentButtonName').html(user["name"] + " " + user["surname"]);
    $('#stuName').html(user["name"] + " " + user["surname"]);
    $('#userIdHeader').html(user["id"]);

    document.getElementById("homePage").onclick = function() {
        console.log("asjhdkjasdasjkdahsd");
        if(user["role"]===0) {
            window.location.replace("http://localhost:8080/templates/home/admin-home.html");
        }
        else if(user["role"]===1) {
            window.location.replace("http://localhost:8080/templates/home/lecturer-home.html");
        }
        else if(user["role"]===2) {
            window.location.replace("http://localhost:8080/templates/home/student-home.html");
        }
    };

    document.getElementById("contentHeader").innerHTML = '<h1>' + user["name"] + " " + user["surname"] + " Profile" + '</h1>';

    courseListObj=getAllCourses(user["id"],user["role"]);
    courseList=JSON.parse(courseListObj.responseText);
    var captions=["Course Id", "Name", "Section"];
    $('#Courses').html(createCourseTable(courseList,captions,1));

    for(var i=0;i<courseList.length;i++){
        var courseId = courseList[i]["id"];
        var sectionId = courseList[i]["sectionId"];
        var courseName = courseList[i]["name"];
        htmlString += '<li><a href="#" onClick="goToCourseHome('
        htmlString += courseId + ',' + "'" + courseName + "'" +  ',' + sectionId + ')"><i class="fa fa-circle-o"></i>';
        htmlString += courseId;
        htmlString += " - ";
        htmlString += sectionId;
        htmlString += '</a></li>';
    }
    document.getElementById("coursesTreeView").innerHTML = htmlString;

    $('#new-password-retype').keyup(function() { //This function is for comparing password and confirmed password
        var newPassword = $("#new-password").val();
        var newPasswordRetype = $("#new-password-retype").val();
        if(newPassword===newPasswordRetype){
            $("#confirmedPassMsg").html("<b style='color:green'>Matched </b>");
        }
        else{
            $("#confirmedPassMsg").html("<b style='color:red'>Passwords don't match </b>");
        }
    });

    $("#change-password-form").submit(function(event) {
        event.preventDefault();
        var currentPassword = $("#current-password").val();
        var newPassword = $("#new-password").val();
        var newPasswordRetype = $("#new-password-retype").val();
        var currentPassCheck = 0;

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/rest/user/login?ID="+user["id"]+"&password="+sha256_digest(currentPassword),
            success: function(response,status){
                console.log("current password true");
            },
            error: function(xhr) {

                console.log("current password wrong");
            }
        });
        window.location.replace("http://localhost:8080/templates/profile/profile.html");
    });

    $("#backToProfilePage").click(function(){
        window.location.replace("http://localhost:8080/templates/profile/profile.html");
    });

});
