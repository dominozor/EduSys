$(document).ready(function() {

    var courseList, courseListObj;
    var user;
    var htmlString = "";
    //First eduUser.js and utility.js is imported to admin-home.js

    $.ajax({
        url: '/views/eduUser/eduUser.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

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


    $('#studentName').html(user["name"] + " " + user["surname"]);
    $('#studentButtonName').html(user["name"] + " " + user["surname"]);
    $('#stuName').html(user["name"] + " " + user["surname"]);

    courseListObj=getAllCourses(user["id"],user["role"]);
    courseList=JSON.parse(courseListObj.responseText);
    var captions=["Course Id", "Name", "Section"];
    $('#Courses').html(createCourseTable(courseList,captions,1));

    for(var i=0;i<courseList.length;i++){
            var courseId = courseList[i]["id"];
            var sectionId = courseList[i]["sectionId"];
            var courseName = courseList[i]["name"];
            htmlString += '<li><a href="#" onClick="goToCourseHome('
            htmlString += courseId + ',' + "'" + courseName + "'" +  ',' + sectionId + ')"><i class="fa fa-circle-o"></i>';
            htmlString += courseId;
            htmlString += " - ";
            htmlString += sectionId;
            htmlString += '</a></li>';
    }
    document.getElementById("coursesTreeView").innerHTML = htmlString;

    $('.courseInfo').click(function () {
        var row=parseInt($(this)[0].id.substr(6)); //Row ids are course#(number) so first 6 characters("course") is not important.
        var course=courseList[row];// After parsing row, now we have row index for courselist.
        createCookie('course',JSON.stringify(course),1); // A cookie is created for the course page.Cookie has the information about course and keeps it as a JSON.
        window.location.replace("http://localhost:8080/templates/course/course.html"); //That redirects to course page
    });

    $('.courseDate').click(function () {
        var row=parseInt($(this)[0].id.substr(10)); //Row ids are course#(number) so first 6 characters("course") is not important.
        var course=courseList[row];// After parsing row, now we have row index for courselist
        createCookie('lecturerCourse',JSON.stringify(course),1); // A cookie is created for the course page.Cookie has the information about course and keeps it as a JSON.
        window.location.replace("http://localhost:8080/templates/date/date.html"); //That redirects to dates page
    });
    $('.courseExam').click(function () {
        var row=parseInt($(this)[0].id.substr(10)); //Row ids are courseExam#(number) so first 10 characters("courseExam") is not important.
        var course=courseList[row];// After parsing row, now we have row index for courselist
        createCookie('examCourse',JSON.stringify(course),1); // A cookie is created for the course page.Cookie has the information about course and keeps it as a JSON.
        window.location.replace("http://localhost:8080/templates/exam/exam.html"); //That redirects to dates page
    });

    $('.takeAttendance').click(function(){
        var row=parseInt($(this)[0].id.substr(14)); //Row ids are courseExam#(number) so first 10 characters("courseExam") is not important.
        var course=courseList[row];// After parsing row, now we have row index for courselist
        // SHOW overlay
        $("#img").show();
        // Retrieve data:
        $.ajax({
            url: "http://localhost:8080/rest/section/takeAttendance/" + course["id"] + "/"  + course["sectionId"],
            type: 'POST',
            success: function(data){
                // onSuccess fill #ajax-box with response data:
                $('#ajax-box').html(data);
                // HIDE the overlay:
                $("#img").hide();
            }
        });
        // Prevent default action of link:
        return false;
    });

    $('.firstLesson').click(function(){
        var row=parseInt($(this)[0].id.substr(11)); //Row ids are courseExam#(number) so first 10 characters("courseExam") is not important.
        var course=courseList[row];// After parsing row, now we have row index for courselist
        // SHOW overlay
        $("#img").show();
        // Retrieve data:
        $.ajax({
            url: "http://localhost:8080/rest/section/firstLesson/" + course["id"] + "/"  + course["sectionId"],
            type: 'POST',
            success: function(data){
                // onSuccess fill #ajax-box with response data:
                $('#ajax-box').html(data);
                // HIDE the overlay:
                $("#img").hide();
            }
        });
        // Prevent default action of link:
        return false;
    });
});