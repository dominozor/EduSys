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

function getExamInfo(courseID, sectionID) {
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/exam/getExamReport/" + courseID + "/" + sectionID,
        async: false // This option prevents this function to execute asynchronized
    });
}

function getSectionInfo(courseID, sectionID) {
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/section/getSectionInfo/" + courseID + "/" + sectionID,
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
    document.getElementById("report-title").innerHTML = course["id"] + " " + course["name"] + " Section " + course["sectionId"] + " Course Report";

    var lecturerObj = getSectionLecturer(course["id"], course["sectionId"]);
    var lecturer = JSON.parse(lecturerObj.responseText);
    var lecturerID = lecturer[0]["id"];
    var lecturerName = lecturer[0]["name"];
    var lecturerSurname = lecturer[0]["surname"];
    document.getElementById("lecturerInfo").innerHTML = '<b>Instructor ID: </b>' + lecturerID + '</br>' + '<b>Instructor Name: </b>' + lecturerName + " " + lecturerSurname + '</br>';


    var dateListObj = getAttendanceDateRatio(course["id"], course["sectionId"]);
    var dateList = JSON.parse(dateListObj.responseText);

    var examListObj = getExamInfo(course["id"], course["sectionId"]);
    var examList = JSON.parse(examListObj.responseText);
    var captions=["Exam Type","Exam Percentage","Average (%)"];
    $('#examInfo').html(createReportTable(examList,captions));

    var examAverage = 0;
    for(var i=0; i<examList.length; i++) {
        for(var val in examList[i]) {
            if(val === "average") examAverage += examList[i][val];
        }
    }
    examAverage /= examList.length;
    document.getElementById("examGeneralInfo").innerHTML = '<b>Number of Exams: </b>' + examList.length + '</br>'
                                                                + '<b>Overall Average: </b>' + "%" + Math.round(examAverage);


    var sectionInfoObj = getSectionInfo(course["id"], course["sectionId"]);
    var sectionInfo = JSON.parse(sectionInfoObj.responseText);

    var attendance_percentage = sectionInfo[0]["attendance_percentage"];
    var exam_percentage = sectionInfo[0]["exam_percentage"];
    var seating_place_percentage = sectionInfo[0]["seating_place_percentage"];

    var min_dist = 100;
    var max_dist = 900;
    for(var i=0; i<dateList.length; i++) {
        var interest = 0;
        var averageDist = dateList[i]['average_distance'];
        averageDist -= min_dist;
        averageDist = max_dist - min_dist - averageDist;
        averageDist /= max_dist - min_dist;
        averageDist *= 100;
        interest += averageDist*seating_place_percentage/100;

        var attendanceRate = dateList[i]['percentage'];
        interest += attendanceRate*attendance_percentage/100;

        interest += exam_percentage;
        dateList[i]['interest'] = interest;
    }

    var captions=["Date","# of Students Attended","# of Students Enrolled","Attendance Percentage (%)", "Daily Interest (%)"];
    $('#attendanceDateInfo').html(createReportTable(dateList,captions));

    var average = 0;
    for(var i=0; i<dateList.length; i++) {
        for(var val in dateList[i]) {
            if(val === "percentage") average += dateList[i][val];
        }
    }
    average /= dateList.length;
    document.getElementById("attendanceGeneralInfo").innerHTML = '<b>Attendance Rate: </b>' + "%" + average;


    var doc = new jsPDF();
    var specialElementHandlers = {
        '#editor': function (element, renderer) {
            return true;
        }
    };

    $('#button').click(function () {
        doc.fromHTML($('#content').html(), 15, 15, {
            'width': 170,
            'elementHandlers': specialElementHandlers
        });
        doc.save('report.pdf');
    });
});

