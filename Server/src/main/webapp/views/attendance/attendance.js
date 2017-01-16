
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

    var img = document.getElementById("studentImage"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    var img = document.getElementById("studentImage2"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    var img = document.getElementById("studentImage3"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    $('#studentName').html(user["name"] + " " + user["surname"])
    $('#studentButtonName').html(user["name"] + " " + user["surname"])
    $('#stuName').html(user["name"] + " " + user["surname"])

    //This gets a course attendance data of a specific student and puts the data to the table to course-attendance div of the attendance.html  
    courAttListObj=getCourseAttForStudent(user["id"], course["id"]);
    courAttList=JSON.parse(courAttListObj.responseText);
    var captions=["Course Id", "Date"];
    $('#course-attendance').html(createAttendanceTable(courAttList,captions));


    $('.getInterestInfo').click(function () {
        var row=parseInt($(this)[0].id.substr(15)); //Row ids are getInterestInfo#(number) so first 15 characters("course") is not important.
        var inter=courAttList[row];// After parsing row, now we have row index for courAttList.
        createCookie('inter',JSON.stringify(inter),1); // A cookie is created for the course page.Cookie has the information about course and keeps it as a JSON.*/
        window.location.replace("http://localhost:8080/templates/attendance/interest.html"); //That redirects to interest page
    });


    $("#backStudentPage").click(function(){
        window.location.replace("http://localhost:8080/templates/home/student-home.html");
    });
});
