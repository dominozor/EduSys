/**
 * Created by Onat1 on 26/12/2016.
 */
$(document).ready(function(){
    var gradeCookie, exam;

    $.ajax({
        url: '/views/utility/utility.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    gradeCookie = JSON.parse(readCookie('grade'));
    exam = JSON.parse(readCookie('exam'));
    user = JSON.parse(readCookie('mainuser'));

    var img = document.getElementById("studentImage"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    $('#studentName').html(user["name"] + " " + user["surname"])
    $('#studentButtonName').html(user["name"] + " " + user["surname"])
    $('#stuName').html(user["name"] + " " + user["surname"])

    $("#update-grade-form").submit(function(event) {
        event.preventDefault();
        var grade = $("#grade").val(); //new grade

        $.ajax({
            type: "PUT",
            url: "http://localhost:8090/rest/studentGrade/update?userId="+gradeCookie["id"]+"&examId="+exam["examId"]+"&grade="+grade,
            success: function(response){

                $("#error_rgs_msg").html("<b style='color:green'>Success...</b>");
            },
            error: function(xhr) {

                $("#error_rgs_msg").html("<b style='color:red'>Fail...</b>");
            }
        });
    });

    $("#backToExamListPage").click(function(){
        window.location.replace("http://localhost:8090/templates/exam/exam-list.html");
    });
});

