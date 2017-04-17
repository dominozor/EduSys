$(document).ready(function(){
    var course,user;
    $.ajax({ //While importing utility.py, other fields are filled with the information that is read from cookie if the result is success.
        url: '/views/utility/utility.js',
        dataType: 'script',
        async: false,
        success: function(response) {
            user = JSON.parse(readCookie('mainuser'));
            course = JSON.parse(readCookie('course'));
            if(user["role"]===2) {
                var img = document.getElementById("studentImage"); //This puts the profile picture of the student to the home page.
                img.src = String(user["ppic"]);

                var img = document.getElementById("studentImage2"); //This puts the profile picture of the student to the home page.
                img.src = String(user["ppic"]);

                var img = document.getElementById("studentImage3"); //This puts the profile picture of the student to the home page.
                img.src = String(user["ppic"]);

                $('#studentName').html(user["name"] + " " + user["surname"]);
                $('#studentButtonName').html(user["name"] + " " + user["surname"]);
                $('#stuName').html(user["name"] + " " + user["surname"]);
                $("#course-id").html(course["id"]);
                $("#course-name").html(course["name"]);
                $("#instructor").html("<td> Instructor </td><td>" + course["instructorName"] + " " + course["instructorLastName"] + "</td>");
                $("#sectionNo").html(course["sectionNo"]);
                $('#userIdHeader').html(user["id"]);
            }
            if(user["role"]===1) {
                var img = document.getElementById("studentImage"); //This puts the profile picture of the student to the home page.
                img.src = String(user["ppic"]);

                var img = document.getElementById("studentImage2"); //This puts the profile picture of the student to the home page.
                img.src = String(user["ppic"]);

                var img = document.getElementById("studentImage3"); //This puts the profile picture of the student to the home page.
                img.src = String(user["ppic"]);

                $('#studentName').html(user["name"] + " " + user["surname"]);
                $('#studentButtonName').html(user["name"] + " " + user["surname"]);
                $('#stuName').html(user["name"] + " " + user["surname"]);
                $("#course-id").html(course["id"]);
                $("#course-name").html(course["name"]);
                $("#sectionNo").html(course["sectionId"]);
                $('#userIdHeader').html(user["id"]);
            }
        }
    });


    $("#backToStudentPage").click(function(){
        eraseCookie("course"); // If user wants to go back to the student or lecturer page, there is no need for this cookie
        if(user["role"]===2) window.location.replace("http://localhost:8080/templates/home/student-home.html");
        if(user["role"]===1) window.location.replace("http://localhost:8080/templates/home/lecturer-home.html");
    });
});

