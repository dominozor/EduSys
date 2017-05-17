/**
 * Created by Onat1 on 17/05/2017.
 */
function getSectionLecturer(courseID, sectionID) {
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/section/getSectionLecturer/" + courseID + "/" + sectionID,
        async: false // This option prevents this function to execute asynchronized
    });
}

function getAttendanceDateRatio(courseID, sectionID) {
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/attendance/getAttendanceDateRatio/" + courseID + "/" + sectionID,
        async: false // This option prevents this function to execute asynchronized
    });
}

$(window).on('load', function() {
    // Animate loader off screen
    $(".myModal2").fadeOut("slow");
});

$(document).ready(function(){
    var user, course;
    $.ajax({
        url: '/views/main/main.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });
    //First eduUser.js and utility.js is imported to admin-home.js
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

    user = JSON.parse(readCookie('mainuser'));
    course = JSON.parse(readCookie('course'));

    var img = document.getElementById("studentImage"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    var img = document.getElementById("studentImage2"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    var img = document.getElementById("studentImage3"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    $('#studentName').html(user["name"] + " " + user["surname"]);
    $('#studentButtonName').html(user["name"] + " " + user["surname"]);
    $('#stuName').html(user["name"] + " " + user["surname"]);
    $('#userIdHeader').html(user["id"]);

    document.getElementById("contentHeader").innerHTML = '<h1>' + course["id"] + " " + course["name"] + " / Section " + course["sectionId"] + '</h1>';

    var lecturerObj = getSectionLecturer(course["id"], course["sectionId"]);
    var lecturer = JSON.parse(lecturerObj.responseText);
    var lecturerID = lecturer[0]["id"];
    var lecturerName = lecturer[0]["name"];
    var lecturerSurname = lecturer[0]["surname"];
    document.getElementById("lecturerInfo").innerHTML = '<b>Instructor ID: </b>' + lecturerID + '</br>' + '<b>Instructor Name: </b>' + lecturerName + " " + lecturerSurname + '</br>';


    var dateListObj = getAttendanceDateRatio(course["id"], course["sectionId"]);
    var dateList = JSON.parse(dateListObj.responseText);
    var captions=["Date","# of Students Attended","# of Students Enrolled","Attendance Percentage (%)"];
    $('#attendanceDateInfo').html(createDateReportTable(dateList,captions));

    var average = 0;
    for(var i=0; i<dateList.length; i++) {
        for(var val in dateList[i]) {
            if(val === "percentage") average += dateList[i][val];
        }
    }
    average /= dateList.length;
    document.getElementById("attendanceGeneralInfo").innerHTML = '<b>Attendance Rate: </b>' + "%" + average;
});

