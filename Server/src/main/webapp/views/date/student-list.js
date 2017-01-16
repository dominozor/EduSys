/**
 * Created by ata2 on 12.12.2016.
 */
function getUserFromDate(sectionId, course, date) { //This function get all students' names that attend a lecture.
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/attendance/getAttendanceFromDate/" + course + "/" + sectionId + "/" + date,
        async: false // This option prevents this function to execute asynchronized
    });
}

$(document).ready(function(){
    var StudentAttList, StudentAttListObj;
    var date, course, user;

    $.ajax({
        url: '/views/utility/utility.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    date = JSON.parse(readCookie('courseDate'));
    course = JSON.parse(readCookie('lecturerCourse'));
    user = JSON.parse(readCookie('mainuser'));

    var img = document.getElementById("studentImage"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    $('#studentName').html(user["name"] + " " + user["surname"])
    $('#studentButtonName').html(user["name"] + " " + user["surname"])
    $('#stuName').html(user["name"] + " " + user["surname"])

    StudentAttListObj=getUserFromDate(course["sectionId"], course["id"], date["date"]);
    StudentAttList=JSON.parse(StudentAttListObj.responseText);
    var captions=["Students"];
    $('#student-list').html(createStudentTable(StudentAttList,captions));


    $("#backDatePage").click(function(){
        eraseCookie("date");
        window.location.replace("http://localhost:8080/templates/date/date.html"); //redirects back to lecturer page
    });

});
