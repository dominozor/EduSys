
function getAllAttForStudent(id) { //This function gets all attendance data of a student from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/attendance/getAllAttendance/" + id,
        async: false  // This option prevents this function to execute asynchronized
    });
}

function getCourseAttForStudent(id, course) { //This function gets a specific course attendance data of a student from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/attendance/getCourseAttendance/" +id+ "/" +course,
        async: false // This option prevents this function to execute asynchronized
    });
}

function listAllStudentsAtt(id, course) { //This function gets attendance data of all students for a specific course from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/attendance/getAllAttendance/" +course+ "/" +id,
        async: false // This option prevents this function to execute asynchronized
    });
}

$(document).ready(function(){
    var courAttList, courAttListObj;
    var course, user;

    $.ajax({
        url: '/views/utility/utility.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    course  = JSON.parse(readCookie('courseAtt'));
    user = JSON.parse(readCookie('mainuser'));

    //This gets a course attendance data of a specific student and puts the data to the table to course-attendance div of the attendance.html  
    courAttListObj=getCourseAttForStudent(user["id"], course["id"]);
    courAttList=JSON.parse(courAttListObj.responseText);
    var captions=["Course Id", "Date"];
    $('#course-attendance').html(createAttendanceTable(courAttList,captions));

    $("#backStudentPage").click(function(){
        window.location.replace("http://localhost:8080/templates/home/student-home.html");
    });
});
