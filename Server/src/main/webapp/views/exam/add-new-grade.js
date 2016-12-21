$(document).ready(function(){

    $.ajax({
        url: '/views/utility/utility.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    var examCourseCookie=JSON.parse(readCookie("examCourse"));
    document.getElementById("course-id").value= examCourseCookie["id"];
    document.getElementById("section-no").value= examCourseCookie["sectionId"];

    $("#add-exam-form").submit(function(event) { // All the information about user is got from the fields.
        event.preventDefault();
        var examid=$("#exam-id").val(); //Name of the user
        var courseid = $("#course-id").val(); //Name of the user
        var sectionno = $("#section-no").val(); //Surname of the user
        var examname = $("#exam-name").val(); //E-mail of the user
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/rest/exam/add?ID="+examid+"&course="+courseid+"&section="+sectionno+"&type="+examname,
            success: function(response){

                $("#error_rgs_msg").html("<b style='color:green'>Success...</b>");


            },
            error: function(xhr) {

                $("#error_rgs_msg").html("<b style='color:red'>Fail...</b>");
            }
        });

        window.location.replace("http://localhost:8080/templates/exam/exam.html");

    });

    $("#backToLecturerPage").click(function(){
        window.location.replace("http://localhost:8080/templates/exam/exam.html");
    });
});
/**
 * Created by ata2 on 21.12.2016.
 */
$(document).ready(function(){

    $.ajax({
        url: '/views/utility/utility.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });


    $("#add-new-grade-form").submit(function(event) { // All the information about user is got from the fields.
        event.preventDefault();
        var examid=$("#exam-id").val(); //Name of the user
        var userid = $("#user-id").val(); //Name of the user
        var grade = $("#grade").val(); //Surname of the user
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/rest/studentGrade/add?userId="+userid+"&examId="+examid+"&grade="+grade,
            success: function(response){

                $("#error_rgs_msg").html("<b style='color:green'>Success...</b>");


            },
            error: function(xhr) {

                $("#error_rgs_msg").html("<b style='color:red'>Fail...</b>");
            }
        });

        window.location.replace("http://localhost:8080/templates/exam/exam-list.html");

    });

    $("#backToExamListPage").click(function(){
        window.location.replace("http://localhost:8080/templates/exam/exam-list.html");
    });
});
/**
 * Created by ata2 on 21.12.2016.
 */
