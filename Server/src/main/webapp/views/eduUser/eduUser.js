$(document).ready(function(){

});

function getUserList() { //This function get the user list from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:9080/rest/user/get",
        async: false  // This option prevents this function to execute asynchronized
    });
}

function getAUser(id) { //This function get a specific user from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:9080/rest/user/get/id",
        async: false // This option prevents this function to execute asynchronized
    });
}

function getAllCourses(id) { //This function get the user list from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: " http://localhost:9080/rest/user/getStudentCourses/" + id,
        async: false  // This option prevents this function to execute asynchronized
    });
}
