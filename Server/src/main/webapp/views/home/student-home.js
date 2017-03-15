$(document).ready(function() {

    var courseList, courseListObj;
    var attList, attListObj;
    var gradeList, gradeListObj;
    var user;

    //First attendance.js, eduUser.js, utility.js and exam.js areimported to student-home.js
    $.ajax({
        url: '/views/attendance/attendance.js',
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
        url: '/views/exam/exam.js',
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

    $('#studentName').html(user["name"] + " " + user["surname"])
    $('#studentButtonName').html(user["name"] + " " + user["surname"])
    $('#stuName').html(user["name"] + " " + user["surname"])

    //When get attendance button is clicked, this function is called and gets data and create the table for attendance.
    $('#getAttendance').click(function () {
        attListObj=getAllAttForStudent(user["id"]);
        attList=JSON.parse(attListObj.responseText);
        var captions=["Course Id", "Date"];
        $('#Attendances').html(createAttendanceTable(attList,captions));
    });

    //This gets the grades of a student and puts the data after creating table of it.
    $('#getGrades').click(function () {
        gradeListObj=getAllGradesOfStudent(user["id"]);
        gradeList=JSON.parse(gradeListObj.responseText);
        var captions=["Course Id", "Course Name", "Grade", "Type"];
        $('#Grades').html(createGradeTable(gradeList,captions))
    });

    //This gets the courses of a student and puts the data after creating table of it.
    courseListObj=getAllCourses(user["id"], user["role"]);
    courseList=JSON.parse(courseListObj.responseText);
    var captions=["Course Id", "Name", "Section No"];
    $('#Courses').html(createCourseTable(courseList,captions,2));

    $('.courseInfo').click(function () {
        var row=parseInt($(this)[0].id.substr(6)); //Row ids are course#(number) so first 6 characters("course") is not important.
        var course=courseList[row];// After parsing row, now we have row index for courselist.
        createCookie('course',JSON.stringify(course),1); // A cookie is created for the course page.Cookie has the information about course and keeps it as a JSON.
        window.location.replace("http://localhost:8080/templates/course/course.html"); //That redirects to course page
    });


    var avgInterestInfoObj=listAverageInterestInfo(user["id"]);
    var avgInterestInfo=JSON.parse(avgInterestInfoObj.responseText);
    var mainInterestInfo = [];
    var interestInfo = new Array();
    for(var i=0; i<avgInterestInfo.length; i++) {
        mainInterestInfo.push(avgInterestInfo[i]["distance"] + (avgInterestInfo[i]["bottomcoor"] - avgInterestInfo[i]["topcoor"]) +
                                (avgInterestInfo[i]["rightcoor"] - avgInterestInfo[i]["leftcoor"]));
        interestInfo.push([avgInterestInfo[i]["courseId"], mainInterestInfo[i]]);
    }

    
    $(".sparkline").sparkline(mainInterestInfo, {
        type: 'pie',
        width: '150px',
        height: '150px',
        tooltipFormat: '{{offset:slice}} ({{percent.1}}%)',
        tooltipValueLookups: {
            'slice':interestInfo
        },
    });


    $('.courseAttendance').click(function () {
        var row=parseInt($(this)[0].id.substr(9)); //Row ids are courseAtt#(number) so first 6 characters("course") is not important.
        var course=courseList[row];// After parsing row, now we have row index for courselist.
        createCookie('courseAtt',JSON.stringify(course),1); // A cookie is created for the course page.Cookie has the information about course and keeps it as a JSON.
        window.location.replace("http://localhost:8080/templates/attendance/attendance.html"); //That redirects to course page
    });

    $('.courseGrades').click(function () {
        var row=parseInt($(this)[0].id.substr(10)); //Row ids are courseGrad#(number) so first 6 characters("course") is not important.
        var course=courseList[row];// After parsing row, now we have row index for courselist
        createCookie('courseGrad',JSON.stringify(course),1); // A cookie is created for the course page.Cookie has the information about course and keeps it as a JSON.
        window.location.replace("http://localhost:8080/templates/exam/exam.html"); //That redirects to course page
    });

});