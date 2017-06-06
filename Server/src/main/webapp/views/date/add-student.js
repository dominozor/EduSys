/**
 * Created by Onat1 on 03/05/2017.
 */
function getClassList(course, sectionId, date) { //This function get all students' names that attend a lecture.
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/sectionStudentList/getSectionStudentList/" + course + "/" + sectionId + "/" + date,
        async: false // This option prevents this function to execute asynchronized
    });
}

function getAttendanceId(course, sectionId, date) {
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/attendance/getAttendanceId/" + course + "/" + sectionId + "/" + date,
        async: false // This option prevents this function to execute asynchronized
    });
}

$(window).on('load', function() {
    // Animate loader off screen
    $(".myModal2").fadeOut("slow");
});

$(document).ready(function(){
    var user, course, date;

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
    course = JSON.parse(readCookie('course'));
    date = JSON.parse(readCookie('courseDate'));
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
    var captions=["Course Id", "Name", "Section"];
    var htmlString = "";
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

    var studentListObj=getClassList(course["id"], course["sectionId"], date["date"]);
    var studentList=JSON.parse(studentListObj.responseText);
    var captions=["ID", "Name", "Surname"];
    $('#add-new-student-list').html(createStudentTable(studentList,captions,0));

    $("#studentTable tr").click(function(){
        $(this).toggleClass('selected');
    });

    $('#addSelectedStudents').click(function(){
        var selected = [];
        $("#studentTable tr.selected").each(function(){
            var index = $('tr').index(this) - 1;
            selected.push($('td:first', this).html() + "-" + $("#rowSelect" + index).val());
        });
        var attendanceIdObj=getAttendanceId(course["id"], course["sectionId"], date["date"]);
        var attendanceId=JSON.parse(attendanceIdObj.responseText)[0]["id"];
        console.log(attendanceId);
        console.log(selected.toString());
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/rest/attendanceList/addStudent?ID="+attendanceId+"&students="+selected.toString(),
            success: function(response){

            },
            error: function(xhr) {
            }
        });
        window.location.replace("http://localhost:8080/templates/date/student-list.html");
    });

    $('#backToAttendancePage').click(function(){
        window.location.replace("http://localhost:8080/templates/date/student-list.html");
    });



});

