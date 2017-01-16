$(document).ready(function(){
    var exam;

    $.ajax({
        url: '/views/utility/utility.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    exam = JSON.parse(readCookie('exam'));
    user = JSON.parse(readCookie('mainuser'));

    var img = document.getElementById("studentImage"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    $('#studentName').html(user["name"] + " " + user["surname"])
    $('#studentButtonName').html(user["name"] + " " + user["surname"])
    $('#stuName').html(user["name"] + " " + user["surname"])


    $("#add-new-grade-form").submit(function(event) { // All the information about user is got from the fields.
        event.preventDefault();
        var userid = $("#user-id").val(); //Name of the user
        var grade = $("#grade").val(); //Surname of the user
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/rest/studentGrade/add?userId="+userid+"&examId="+exam["examId"]+"&grade="+grade,
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

