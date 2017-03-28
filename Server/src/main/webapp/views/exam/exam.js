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

function deleteExam(exam) { //This function gets all exams of a section from the Rest services of EduSys
    console.log("examid = " + exam["examId"]);
    return $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/rest/exam/delete/" + exam["examId"],
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

        $('#shortcutToHome').attr('href', "http://localhost:8080/templates/home/student-home.html");

        course  = JSON.parse(readCookie('course'));

        var img = document.getElementById("studentImage"); //This puts the profile picture of the student to the home page.
        img.src = String(user["ppic"]);

        var img = document.getElementById("studentImage2"); //This puts the profile picture of the student to the home page.
        img.src = String(user["ppic"]);

        var img = document.getElementById("studentImage3"); //This puts the profile picture of the student to the home page.
        img.src = String(user["ppic"]);

        $('#studentName').html(user["name"] + " " + user["surname"])
        $('#studentButtonName').html(user["name"] + " " + user["surname"])
        $('#stuName').html(user["name"] + " " + user["surname"])

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

        $('#shortcutToHome').attr('href', "http://localhost:8080/templates/home/lecturer-home.html");

        course = JSON.parse(readCookie('examCourse'));
        var img = document.getElementById("studentImage"); //This puts the profile picture of the student to the home page.
        img.src = String(user["ppic"]);

        var img = document.getElementById("studentImage2"); //This puts the profile picture of the student to the home page.
        img.src = String(user["ppic"]);

        var img = document.getElementById("studentImage3"); //This puts the profile picture of the student to the home page.
        img.src = String(user["ppic"]);

        $('#studentName').html(user["name"] + " " + user["surname"])
        $('#studentButtonName').html(user["name"] + " " + user["surname"])
        $('#stuName').html(user["name"] + " " + user["surname"])
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

        $('.deleteExam').click(function () {
            var row=parseInt($(this)[0].id.substr(10)); //Row ids are courseGrade#(number) so first 12 characters("courseGrade") is not important.
            var exam=sectExamList[row];// After parsing row, now we have row index for exam list
            //createCookie('exam',JSON.stringify(exam),1); // A cookie is created for the exam page.Cookie has the information about course and keeps it as a JSON.
            console.log(exam);
            deleteExam(exam);
            window.location.replace("http://localhost:8080/templates/exam/exam.html");
        });




        $("#add-exam").html('<input type="button" id="addExam" value="Add Exam">');

        $("#backToStudentPage").click(function(){
            eraseCookie("examCourse"); // If user wants to go back to the lecturer page, there is no need for this cookie
            window.location.replace("http://localhost:8080/templates/home/lecturer-home.html");
        });
        $('#addExam').click(function () {

            window.location.replace("http://localhost:8080/templates/exam/add-exam.html");
        });



    }

});
