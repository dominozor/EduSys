$(document).ready(function(){

    $.ajax({
        url: '/views/utility/utility.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    var examCourseCookie=JSON.parse(readCookie("examCourse"));
    document.getElementById("course-id").value= examCourseCookie["id"];
    document.getElementById("section-no").value= examCourseCookie["sectionId"];

    user = JSON.parse(readCookie('mainuser'));

    var img = document.getElementById("studentImage"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    $('#studentName').html(user["name"] + " " + user["surname"])
    $('#studentButtonName').html(user["name"] + " " + user["surname"])
    $('#stuName').html(user["name"] + " " + user["surname"])

    $("#add-exam-form").submit(function(event) { // All the information about user is got from the fields.
        event.preventDefault();
        var courseid = $("#course-id").val(); //Name of the user
        var sectionno = $("#section-no").val(); //Surname of the user
        var examname = $("#exam-name").val(); //E-mail of the user
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/rest/exam/add?course="+courseid+"&section="+sectionno+"&type="+examname,
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
