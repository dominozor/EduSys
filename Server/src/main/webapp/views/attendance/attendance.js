$(document).ready(function(){

});

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
        url: "http://localhost:9080/rest/attendance/getCourseAttendance/id/course",
        async: false // This option prevents this function to execute asynchronized
    });
}

function listAllStudentsAtt(id, course) { //This function get a specific user from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:9080/rest/attendance/getAllAttendance/course/id",
        async: false // This option prevents this function to execute asynchronized
    });
}
