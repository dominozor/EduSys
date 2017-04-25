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

function getSection(courseID, sectionID) {

    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/section/get/" + courseID + "/" + sectionID,
        async: false
    })
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

    var sectionInfoObj = getSection(course["id"], course["sectionId"]);
    var sectionInfo = JSON.parse(sectionInfoObj.responseText);

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

    var courseInterestObj = getInterestsOfCourses(user["id"]);
    var courseInterest = JSON.parse(courseInterestObj.responseText);

    var numberOfRow = 0;
    var numberOfSeat = 0;

    var class_size = sectionInfo["class_size"];
    var old_row_number = "";
    var old_seat_number = "";
    var flag = 0;

    for(var i=0; i<class_size.length; i++) {
        if(flag == 0) {
            if(class_size[i] != "x") {
                old_row_number += class_size[i];
            }
            else
                flag = 1;
        }
        else
            old_seat_number += class_size[i];
    }

    numberOfRow = Math.max(parseInt(old_row_number, 10), numberOfRow);
    numberOfSeat = Math.max(parseInt(old_seat_number, 10), numberOfSeat);


    //window.alert(numberOfRow + " " + numberOfSeat);


    var zz=[];

    for(var i=0; i<numberOfRow; i++) {
        var zzRow = [];
        for(var j=0; j<numberOfSeat; j++) {
            zzRow.push(0);
        }
        zz.push(zzRow);
    }


    var seatCounter=0;

    for(var i = 0; i<courseInterest.length;i++)
    {
        if(courseInterest[i]["courseId"] == course["id"] && courseInterest[i]["sectionId"] == course["sectionId"]) {
            for (var j = 0; j < zz.length; j++) {
                if (courseInterest[i]["distance"] >= j * 100 && courseInterest[i]["distance"] < (j + 1) * 100) {
                    var seat;
                    seat = Math.floor(courseInterest[i]["leftcoor"] / 20);
                    zz[j][seat] += 1;
                    seatCounter++;
                }
            }
        }
    }


    for(var i=0;i<zz.length;i++)
    {
        for(var j=0 ; j<zz[i].length;j++)
        {
            zz[i][j]=(zz[i][j]/seatCounter)*100;
        }
    }


    var xx=[];
    var yy=[];

    for(var i =0 ;i< 15; i++)
    {
        xx.push(i.toString());
        yy.push(i.toString());
    }

    /*for(var i =0 ;i< 15; i++)
     {
     var tempz=[];
     for(var j =0 ;j< 9; j++)
     {
     tempz.push(Math.floor(Math.random() * 101) -10 );

     }
     zz.push(tempz);
     }*/

    var xList = [];
    var yList = [];

    for(var i=0; i<numberOfSeat; i++) {
        xList.push('x' + i.toString());
    }

    for(var i=0; i<numberOfRow; i++) {
        yList.push('y' + i.toString());
    }

    var data = [
        {
            z : zz,
            x: xList,
            y: yList,
            type: 'heatmap'
        }
    ];

    Plotly.newPlot('heatmapContainer', data);

});
