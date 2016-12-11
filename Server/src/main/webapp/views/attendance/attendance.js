
function getAllAttForStudent(id) { //This function get the user list from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:9080/rest/attendance/getAllAttendance/" + id,
        async: false  // This option prevents this function to execute asynchronized
    });
}

function getCourseAttForStudent(id, course) { //This function get a specific user from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:9080/rest/attendance/getCourseAttendance/" +id+ "/" +course,
        async: false // This option prevents this function to execute asynchronized
    });
}

function listAllStudentsAtt(id, course) { //This function get a specific user from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:9080/rest/attendance/getAllAttendance/" +course+ "/" +id,
        async: false // This option prevents this function to execute asynchronized
    });
}

$(document).ready(function(){
    var courAttList, courAttListObj;

    $.ajax({
        url: '/views/utility/utility.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    courAttListObj=getCourseAttForStudent(194, 5710465);
    courAttList=JSON.parse(courAttListObj.responseText);
    var captions=["Course Id", "Date"];
    $('#course-attendance').html(createAttendanceTable(courAttList,captions));

    $("#backStudentPage").click(function(){
        window.location.replace("http://localhost:9080/templates/home/student-home.html");
    });
});
