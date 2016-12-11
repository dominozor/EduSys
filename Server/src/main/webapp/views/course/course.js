$(document).ready(function(){
    var course;
    $.ajax({ //While importing utility.py, other fields are filled with the information that is read from cookie if the result is success.
        url: '/views/utility/utility.js',
        dataType: 'script',
        async: false,
        success: function(response) {
            course = JSON.parse(readCookie('course'));
            $("#c-id").html("Id:")
            $("#course-id").html(course["id"]);
            $("#c-name").html("Name:")
            $("#course-name").html(course["name"]);
        }
    });

    $("#backToStudentPage").click(function(){
        eraseCookie("course"); // If user wants to go back to the admin page, there is no need for this cookie
        window.location.replace("http://localhost:9080/templates/home/student-home.html");
    });
});

