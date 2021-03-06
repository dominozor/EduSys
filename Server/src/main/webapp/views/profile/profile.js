/**
 * Created by Onat1 on 10/04/2017.
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
    $.ajax({
        url: '/views/WS/websocket.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    user = JSON.parse(readCookie('mainuser'));

    var img = document.getElementById("studentImage"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    var img = document.getElementById("studentImage2"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    var img = document.getElementById("studentImage3"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    var img = document.getElementById("studentImage4"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    $('#studentName').html(user["name"] + " " + user["surname"]);
    $('#studentButtonName').html(user["name"] + " " + user["surname"]);
    $('#stuName').html(user["name"] + " " + user["surname"]);
    $('.profile-username').html(user["name"] + " " + user["surname"]);
    $('#userIdHeader').html(user["id"]);

    if(user["role"]===0) {
        $('#userRole').html("Admin");
    }
    else if(user["role"]===1) {
        $('#userRole').html("Lecturer");
    }
    else if(user["role"]===2) {
        $('#userRole').html("Student");
    }

    document.getElementById("homePage").onclick = function() {

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

    $('#userID').html(user["id"]);
    $('#userEmail').html(user["email"]);
    $('#userProPic').html(user["ppic"]);

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

});