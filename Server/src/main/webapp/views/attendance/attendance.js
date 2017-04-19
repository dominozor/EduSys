
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

function getNumberOfAttendance(course, sectionID) { //This function gets attendance data of all students for a specific course from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/attendance/getAttendanceNumber/" +course+ "/" +sectionID,
        async: false // This option prevents this function to execute asynchronized
    });
}

function listAverageInterestInfo(course) { //This function gets attendance data of all students for a specific course from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/attendance/listAvgInterests/" +course,
        async: false // This option prevents this function to execute asynchronized
    });
}

function listCoursesOfStudent(userID) { //This function gets attendance data of all students for a specific course from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/user/getStudentCourses/" +userID,
        async: false // This option prevents this function to execute asynchronized
    });
}

function getInterestsOfCourses(userID) { //This function gets attendance data of all students for a specific course from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/attendance/getInterestInfo/" +userID,
        async: false // This option prevents this function to execute asynchronized
    });
}

function getNumofStudentsForSection(courseID,sectionID) {

    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/course/getNumofStudentsForSection/" + courseID + "/" + sectionID ,
        async: false // This option prevents this function to execute asynchronized
    });
}

$(document).ready(function(){
    var courAttList, courAttListObj, totalNumberOfAttendanceObj, totalNumberOfAttendance;
    var course, user;

    $.ajax({
        url: '/views/main/main.js',
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

    course  = JSON.parse(readCookie('course'));
    user = JSON.parse(readCookie('mainuser'));
    wsSendMessage(user["id"]);

    var img = document.getElementById("studentImage"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    var img = document.getElementById("studentImage2"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    var img = document.getElementById("studentImage3"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    $('#studentName').html(user["name"] + " " + user["surname"])
    $('#studentButtonName').html(user["name"] + " " + user["surname"])
    $('#stuName').html(user["name"] + " " + user["surname"])
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

    //This gets a course attendance data of a specific student and puts the data to the table to course-attendance div of the attendance.html  
    courAttListObj=getCourseAttForStudent(user["id"], course["id"]);
    courAttList=JSON.parse(courAttListObj.responseText);

    totalNumberOfAttendanceObj=getNumberOfAttendance(course["id"], course["sectionId"]);
    totalNumberOfAttendance=JSON.parse(totalNumberOfAttendanceObj.responseText);

    var captions=["Course Id", "Date"];
    var secondTableCaption=["Number Of Student Attendance", "Total Attendance Taken"]
    $('#course-attendance').html(createAttendanceTable(courAttList,captions,totalNumberOfAttendance, secondTableCaption));

    document.getElementById("attendanceRate").innerHTML = "<h3>" + "%" + parseInt((courAttList.length/totalNumberOfAttendance[0]["attendanceNumber"])*100, 10) + "</h3>" + "<p>Attendance Rate</p>";


    var numOfStudents = getNumofStudentsForSection(course["id"], course["sectionId"]).responseText;
    document.getElementById("numOfStudents").innerHTML = "<h3>" + numOfStudents + "</h3>" + "<p>Students</p>";

    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal
    $('.getAttendanceInfo').click(function() {
        var data = [
            {
                z: [[6,8,9,5,7,2,5,10,3,6], [6,7,6,7,6,7,6,7,6,7], [5,6,5,6,5,6,5,6,5,6], [5,6,5,6,5,6,5,6,5,6], [4,5,4,5,4,5,4,5,4,5],
                    [4,5,4,5,4,5,4,5,4,5], [4,6,5,7,4,6,5,7,4,6], [3,6,4,7,3,6,4,7,3,6], [2,3,4,2,3,4,2,3,4,4], [2,3,4,2,3,4,2,3,4,5]],
                x: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                y: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                type: 'heatmap'
            }
        ];

        Plotly.newPlot('heatmapContainerPopUp', data);

        modal.style.display = "block";
    });

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    $('#goToHome').click(function () {
        window.location.replace("http://localhost:8080/templates/home/student-home.html");
    });

    $('#goToDates').click(function () {
        window.location.replace("http://localhost:8080/templates/attendance/attendance.html");
    });

    $('#goToExams').click(function () {
        window.location.replace("http://localhost:8080/templates/exam/exam.html");
    });


    $("#backStudentPage").click(function(){
        window.location.replace("http://localhost:8080/templates/home/student-home.html");
    });


    //Overall Heat Map
    var data = [
        {
            z: [[6,8,9,5,7,2,5,10,3,6], [6,7,6,7,6,7,6,7,6,7], [5,6,5,6,5,6,5,6,5,6], [5,6,5,6,5,6,5,6,5,6], [4,5,4,5,4,5,4,5,4,5],
                [4,5,4,5,4,5,4,5,4,5], [4,6,5,7,4,6,5,7,4,6], [3,6,4,7,3,6,4,7,3,6], [2,3,4,2,3,4,2,3,4,4], [2,3,4,2,3,4,2,3,4,5]],
            x: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            y: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            type: 'heatmap'
        }
    ];

    Plotly.newPlot('heatmapContainer', data);

});
