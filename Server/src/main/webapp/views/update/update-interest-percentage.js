/**
 * Created by onur on 11.04.2017.
 */

function getSectionInfo(courseID,sectionID) {

    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/section/get/" + courseID + "/" + sectionID ,
        async: false // This option prevents this function to execute asynchronized
    });
}

$(document).ready(function(){

    var courseList, courseListObj;
    var htmlString = "";
    $.ajax({
        url: '/views/main/main.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });
    $.ajax({
        url: '/views/eduUser/eduUser.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    $.ajax({ //While importing utility.py, other fields are filled with the information that is read from cookie if the result is success.
        url: '/views/utility/utility.js',
        dataType: 'script',
        async: false,

    });

    $.ajax({
        url: '/views/WS/websocket.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    var course = JSON.parse(readCookie('course'));
    var user = JSON.parse(readCookie('mainuser'));
    wsSendMessage(user["id"]);

    var img = document.getElementById("studentImage"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    var img = document.getElementById("studentImage2"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    var img = document.getElementById("studentImage3"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    $('#studentName').html(user["name"] + " " + user["surname"]);
    $('#studentButtonName').html(user["name"] + " " + user["surname"]);
    $('#stuName').html(user["name"] + " " + user["surname"]);
    $('#userIdHeader').html(user["id"]);

    var sectionInfoObj = getSectionInfo(course["id"], course["sectionId"]);
    var sectionInfo=JSON.parse(sectionInfoObj.responseText);

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

    $("#update-exam-perc").val(sectionInfo["exam_percentage"]);
    $("#update-seating-perc").val(sectionInfo["seating_place_percentage"]);
    $("#update-attendance-perc").val(sectionInfo["attendance_percentage"]);

    $("#update-form").submit(function(event) { // After clicking on "Update" button, all the information again is got from the fields to send request.
        event.preventDefault();
        var exam_perc = $("#update-exam-perc").val();
        var seating_perc = $("#update-seating-perc").val();
        var attendance_perc = $("#update-attendance-perc").val();

        $.ajax({
            type: "PUT", //We use PUT for update
            url: "http://localhost:8080/rest/section/update?course="+sectionInfo["course_id"]+"&section="+sectionInfo["section_no"]+"&user_id="+sectionInfo["user_id"]+
                 "&number_of_students="+sectionInfo["number_of_students"]+"&number_of_lectures="+sectionInfo["number_of_lectures"]+"&exam_percentage="+exam_perc+
                 "&seating_place_percentage="+seating_perc+"&attendance_percentage="+attendance_perc+"&class_size="+sectionInfo["class_size"],
            success: function(response){

                $("#error_upt_msg").html("</br><b style='color:green'>Success!</b>");

            },
            error: function(xhr) {

                $("#error_upt_msg").html("</br><b style='color:red'>Fail!</b>");
            }
        });
        window.location.replace("http://localhost:8080/templates/course/course-home.html");
    });

    $("#backToCourseHomePage").click(function(){
        window.location.replace("http://localhost:8080/templates/course/course-home.html");
    });
});

