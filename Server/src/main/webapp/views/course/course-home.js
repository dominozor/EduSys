$(document).ready(function() {

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
        url: '../../lib/plugins/chartjs/Chart.min.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

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

    function getTotalAttendanceRateForSection(courseID,sectionID) {

        return $.ajax({
            type: "GET",
            url: "http://localhost:8080/rest/attendance/getTotalAttendanceRateForSection/" + courseID + "/" + sectionID ,
            async: false // This option prevents this function to execute asynchronized
        });
    }





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

    $("#course-dates-btn").click(function(){
        window.location.replace("http://localhost:8080/templates/date/date.html"); //redirects back to lecturer page
    });

    $("#course-exams-btn").click(function(){
        window.location.replace("http://localhost:8080/templates/exam/exam.html"); //redirects back to lecturer page
    });

    $('#studentName').html(user["name"] + " " + user["surname"]);
    $('#studentButtonName').html(user["name"] + " " + user["surname"]);
    $('#stuName').html(user["name"] + " " + user["surname"]);

    var courseListObj=getAllCourses(user["id"],user["role"]);
    var courseList=JSON.parse(courseListObj.responseText);
    var htmlString = "";

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

    var numStudents;
    numStudents=getNumofStudentsForSection(course["id"],course["sectionId"]).responseText;

    var numOfExams;
    numOfExams = getNumofExamsForSection(course["id"],course["sectionId"]).responseText;

    var attendanceRateObj;
    attendanceRateObj = getTotalAttendanceRateForSection(course["id"],course["sectionId"]);
    var attendanceRateList=JSON.parse(attendanceRateObj.responseText);
    var percentageRate = parseInt(attendanceRateList[0]["totalstu"]) / parseInt(attendanceRateList[0]["mult"]);
    percentageRate = percentageRate *100;




    document.getElementById("coursesTreeView").innerHTML = htmlString;

    document.getElementById("contentHeader").innerHTML = '<h1>' + course["id"] + " " + course["name"] + " / Section " + course["sectionId"] + '</h1>';

    document.getElementById("numOfStudents").innerHTML = "<h3>" + numStudents + "</h3>" + "<p>Students</p>";

    document.getElementById("numOfExamsGraded").innerHTML = "<h3>" + numOfExams + "</h3>" + "<p>Exams and Assignments Graded</p>";

    document.getElementById("attendanceRate").innerHTML = "<h3>" + "%" + percentageRate + "</h3>" + "<p>Attendance Rate</p>";






});