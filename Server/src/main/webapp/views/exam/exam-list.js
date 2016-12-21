/**
 * Created by Onat1 on 21/12/2016.
 */
function getAllGradesOfAnExam(examid) {
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/exam/getAllGrades/"+examid,
        async: false  // This option prevents this function to execute asynchronized
    });
}

$(document).ready(function(){
    var exam;
    var examGradeList, examGradeListObj;

    $.ajax({
        url: '/views/utility/utility.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    exam = JSON.parse(readCookie('exam'));

    //This gets exam grades data of a specific exam and puts the data to the table
    examGradeListObj=getAllGradesOfAnExam(exam["examId"]);
    examGradeList=JSON.parse(examGradeListObj.responseText);
    var captions=["Student ID","Student Name", "Student Surname","Grade"];

    $('#exam-grades').html(createExamTable(examGradeList,captions));

    $("#backToExamPage").click(function(){
        eraseCookie("exam"); // If user wants to go back to the exam page, there is no need for this cookie
        window.location.replace("http://localhost:8080/templates/exam/exam.html");
    });

});