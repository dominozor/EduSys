/**
 * Created by onur on 29.03.2017.
 */

function getNumofStudentsForSection(courseID,sectionID) {

    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/course/getNumofStudentsForSection/" + courseID + "/" + sectionID ,
        async: false // This option prevents this function to execute asynchronized
    });
}

function getNumofExamsForSection(courseID,sectionID) {

    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/course/getNumofExamsForSection/" + courseID + "/" + sectionID ,
        async: false // This option prevents this function to execute asynchronized
    });
}

$(document).ready(function() {


    $.ajax({
        url: '/views/main/main.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });
    //First and utility.js is imported to course-home.js
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
        url: '/views/attendance/attendance.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    $.ajax({
        url: '/views/WS/websocket.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });


    $.ajax({
        url: '../../lib/plugins/chartjs/Chart.min.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });



    var user = JSON.parse(readCookie('mainuser'));
    wsSendMessage(user["id"]);
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

    var courseListObj=getAllCourses(user["id"],user["role"]);
    var courseList=JSON.parse(courseListObj.responseText);
    var htmlString = "";

    for(var i=0;i<courseList.length;i++){
        var courseId = courseList[i]["id"];
        var sectionId = courseList[i]["sectionId"];
        var courseName = courseList[i]["name"];
        htmlString += '<li><a href="#" onClick="goToStudentCourseHome('
        htmlString += courseId + ',' + "'" + courseName + "'" +  ',' + sectionId + ')"><i class="fa fa-circle-o"></i>';
        htmlString += courseId;
        htmlString += " - ";
        htmlString += sectionId;
        htmlString += '</a></li>';
    }
    document.getElementById("coursesTreeView").innerHTML = htmlString;

    var course = JSON.parse(readCookie('course'));
    document.getElementById("contentHeader").innerHTML = '<h1>' + course["id"] + " " + course["name"] + " / Section " + course["sectionId"] + '</h1>';


    var numOfStudents = getNumofStudentsForSection(course["id"], course["sectionId"]).responseText;
    document.getElementById("numOfStudents").innerHTML = "<h3>" + numOfStudents + "</h3>" + "<p>Students</p>";


    var numOfExams = getNumofExamsForSection(course["id"], course["sectionId"]).responseText;
    document.getElementById("numOfExamsGraded").innerHTML = "<h3>" + numOfExams + "</h3>" + "<p>Exams and Assignments Graded</p>";


    var courAttListObj = getCourseAttForStudent(user["id"], course["id"]);
    var courAttList = JSON.parse(courAttListObj.responseText);

    var totalNumberOfAttendanceObj = getNumberOfAttendance(course["id"], course["sectionId"]);
    var totalNumberOfAttendance = JSON.parse(totalNumberOfAttendanceObj.responseText);

    document.getElementById("attendanceRate").innerHTML = "<h3>" + "%" + parseInt((courAttList.length/totalNumberOfAttendance[0]["attendanceNumber"])*100, 10) + "</h3>" + "<p>Attendance Rate</p>";


    $('#goToHome').click(function () {
        window.location.replace("http://localhost:8080/templates/home/student-home.html");
    });

    $('#goToDates').click(function () {
        window.location.replace("http://localhost:8080/templates/attendance/attendance.html");
    });

    $('#goToExams').click(function () {
        window.location.replace("http://localhost:8080/templates/exam/exam.html");
    });

    var data = [
        {
            z: [[6,8,9,5,7,2,5,10,3,6], [6,7,6,7,6,7,6,7,6,7], [5,6,5,6,5,6,5,6,5,6], [5,6,5,6,5,6,5,6,5,6], [4,5,4,5,4,5,4,5,4,5],
                [4,5,4,5,4,5,4,5,4,5], [4,6,5,7,4,6,5,7,4,6], [3,6,4,7,3,6,4,7,3,6], [2,3,4,2,3,4,2,3,4,4], [2,3,4,2,3,4,2,3,4,5]],
            x: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            y: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            type: 'heatmap'
        }
    ];

    Plotly.newPlot('heatmapContainer', data);

});
