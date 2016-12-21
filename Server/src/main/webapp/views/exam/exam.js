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

function getAllExamsOfASection(courseid, sectionid) { //This function gets all exams of a section from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/course/getCourseSectionExams/"+courseid+"/"+sectionid,
        async: false  // This option prevents this function to execute asynchronized
    });
}

$(document).ready(function(){
    var courGradeList, courGradeListObj;
    var sectExamList, sectExamListObj;
    var course, user;

    $.ajax({
        url: '/views/utility/utility.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    user = JSON.parse(readCookie('mainuser'));

    if(user["role"]===2) {
        course  = JSON.parse(readCookie('courseGrad'));
        //This gets a course grade data of a specific student and puts the data to the table to course-grade div of the attendance.html
        courGradeListObj=getCourseGradeOfStudent(user["id"], course["id"]);
        courGradeList=JSON.parse(courGradeListObj.responseText);
        var captions=["Course Id", "Course Name", "Exam Grade", "Exam Type"];
        $('#course-grade').html(createGradeTable(courGradeList,captions, user["role"]));

        $("#backToStudentPage").click(function(){
            eraseCookie("courseGrad");
            window.location.replace("http://localhost:8080/templates/home/student-home.html");
        });
    }
    else if(user["role"]===1) {
        course = JSON.parse(readCookie('examCourse'));
        //This gets a  exam data of a specific section and puts the data to the table to course-grade div of the attendance.html
        sectExamListObj=getAllExamsOfASection(course["id"], course["sectionId"]);
        sectExamList=JSON.parse(sectExamListObj.responseText);
        var captions=["Course Id", "Section Id", "Average", "Exam Type"];

        $('#course-grade').html(createGradeTable(sectExamList,captions,user["role"]));

        $('.getGradeList').click(function () {
            var row=parseInt($(this)[0].id.substr(12)); //Row ids are courseGrade#(number) so first 12 characters("courseGrade") is not important.
            var exam=sectExamList[row];// After parsing row, now we have row index for exam list
            createCookie('exam',JSON.stringify(exam),1); // A cookie is created for the exam page.Cookie has the information about course and keeps it as a JSON.
            window.location.replace("http://localhost:8080/templates/exam/exam-list.html");
        });

        $("#backToStudentPage").click(function(){
            eraseCookie("examCourse"); // If user wants to go back to the lecturer page, there is no need for this cookie
            window.location.replace("http://localhost:8080/templates/home/lecturer-home.html");
        });
    }

});
