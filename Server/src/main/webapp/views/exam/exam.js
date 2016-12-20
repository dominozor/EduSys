function getCourseGradeOfStudent(userid, courseid) { //This function gets course grade data of a student from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/user/getExamGrade/"+userid+"/"+courseid,
        async: false  // This option prevents this function to execute asynchronized
    });
}

function getAllGradesOfStudent(userid) { //This function gets all grades data of a student from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/user/getExamGrades/"+userid,
        async: false  // This option prevents this function to execute asynchronized
    });
}

$(document).ready(function(){
    var courGradeList, courGradeListObj;
    var course, user;

    $.ajax({
        url: '/views/utility/utility.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    course  = JSON.parse(readCookie('courseGrad'));
    user = JSON.parse(readCookie('mainuser'));
    //This gets a course grade data of a specific student and puts the data to the table to course-grade div of the attendance.html
    courGradeListObj=getCourseGradeOfStudent(user["id"], course["id"]);
    courGradeList=JSON.parse(courGradeListObj.responseText);
    var captions=["Course Id", "Course Name", "Exam Grade", "Exam Type"];
    $('#course-grade').html(createGradeTable(courGradeList,captions));

    $("#backToStudentPage").click(function(){
        window.location.replace("http://localhost:8080/templates/home/student-home.html");
    });
});
