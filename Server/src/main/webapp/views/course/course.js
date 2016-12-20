$(document).ready(function(){
    var course,user;
    $.ajax({ //While importing utility.py, other fields are filled with the information that is read from cookie if the result is success.
        url: '/views/utility/utility.js',
        dataType: 'script',
        async: false,
        success: function(response) {
            course = JSON.parse(readCookie('course'));
            $("#course-id").html(course["id"]);
            $("#course-name").html(course["name"]);
            $("#instructor-name").html(course["instructorName"]);
            $("#instructor-lastname").html(course["instructorLastName"]);
            $("#sectionNo").html(course["sectionNo"]);
        }
    });
    user = JSON.parse(readCookie('mainuser'));
    $("#backToStudentPage").click(function(){
        eraseCookie("course"); // If user wants to go back to the student or lecturer page, there is no need for this cookie
        if(user["role"]===2) window.location.replace("http://localhost:8080/templates/home/student-home.html");
        if(user["role"]===1) window.location.replace("http://localhost:8080/templates/home/lecturer-home.html");
    });
});

