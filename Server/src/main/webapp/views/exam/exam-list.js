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



function deleteUserGrade(userId,examid) { //This function deletes a student from the database.
    return $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/rest/exam/deleteGrade/" + userId + "/" + examid ,
        async: false // This option prevents this function to execute asynchronized
    });
}

function updateExam(examid,courseid,sectionno,type,average,len,grade) {


    var newaverage;
    newaverage = average*Number(len) - Number(grade);
    newaverage = newaverage / (Number(len)-1);
    newaverage = newaverage.toString();


    return $.ajax({
        type: "PUT",
        url: "http://localhost:8080/rest/exam/update?ID="+examid+"&course="+courseid+"&section="+sectionno+"&type="+type+"&average="+newaverage,
        success: function(response){

            $("#error_rgs_msg").html("<b style='color:green'>Success...</b>");


        },
        error: function(xhr) {

            $("#error_rgs_msg").html("<b style='color:red'>Fail...</b>");
        }
    });


}




$(document).ready(function(){
    var exam, user;
    var examGradeList, examGradeListObj;

    $.ajax({
        url: '/views/utility/utility.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });


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

    exam = JSON.parse(readCookie('exam'));

    //This gets exam grades data of a specific exam and puts the data to the table
    examGradeListObj=getAllGradesOfAnExam(exam["examId"]);
    examGradeList=JSON.parse(examGradeListObj.responseText);
    var captions=["Student ID","Student Name", "Student Surname","Grade"];

    $('#exam-grades').html(createExamTable(examGradeList,captions));

    $('.updateGrade').click(function () {
        createCookie('lengthU',Object.keys(examGradeList).length,1);
        var row = parseInt($(this)[0].id.substr(11));
        var grade = examGradeList[row];
        createCookie('grade',JSON.stringify(grade),1);
        window.location.replace("http://localhost:8080/templates/exam/update-grade.html");
    });


    $('.deleteGrade').click(function () {
        var row = parseInt($(this)[0].id.substr(11));
        var grade = examGradeList[row];
        deleteUserGrade(grade["id"],exam["examId"]);
        updateExam(exam["examId"],exam["courseId"],exam["sectionNo"],exam["type"],exam["average"],Object.keys(examGradeList).length, grade["grade"]);
        window.location.replace("http://localhost:8080/templates/exam/exam-list.html");
    });


    $("#addNewGrade").click(function(){
        createCookie('length',Object.keys(examGradeList).length,1);
        window.location.replace("http://localhost:8080/templates/exam/add-new-grade.html");

    });

    $("#backToExamPage").click(function(){
        eraseCookie("exam"); // If user wants to go back to the exam page, there is no need for this cookie
        window.location.replace("http://localhost:8080/templates/exam/exam.html");

    });

    $("#addNewGrade").click(function(){
        window.location.replace("http://localhost:8080/templates/exam/add-new-grade.html");

    });

});