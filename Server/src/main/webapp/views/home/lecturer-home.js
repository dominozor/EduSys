$(document).ready(function() {

    var courseList, courseListObj;
    var attList, attListObj;
    //First eduUser.js and utility.js is imported to admin-home.js
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


    $('#getAttendance').click(function () {
        attListObj=getAllAttForStudent(1942085);
        attList=JSON.parse(attListObj.responseText);
        var captions=["Course Id", "Date"];
        $('#Attendance').html(createAttendanceTable(attList,captions))
    });

    courseListObj=getAllCourses(1942002,1);
    courseList=JSON.parse(courseListObj.responseText);
    var captions=["Course Id", "Name", "Section"];
    $('#Courses').html(createCourseTable(courseList,captions,1))

    $('.courseInfo').click(function () {

        var row=parseInt($(this)[0].id.substr(6)); //Row ids are course#(number) so first 6 characters("course") is not important.

        var course=courseList[row];// After parsing row, now we have row index for courselist

        createCookie('course',JSON.stringify(course),1); // A cookie is created for the course page.Cookie has the information about course and keeps it as a JSON.

        window.location.replace("http://localhost:8080/templates/course/course.html"); //That redirects to course page
    });

    $('.courseDate').click(function () {
        window.location.replace("http://localhost:8080/templates/date/date.html"); //That redirects to dates page
    });
});