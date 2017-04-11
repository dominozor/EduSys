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

    var course = JSON.parse(readCookie('course'));
    var user = JSON.parse(readCookie('mainuser'));

    var img = document.getElementById("studentImage"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    var img = document.getElementById("studentImage2"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    var img = document.getElementById("studentImage3"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    $('#studentName').html(user["name"] + " " + user["surname"])
    $('#studentButtonName').html(user["name"] + " " + user["surname"])
    $('#stuName').html(user["name"] + " " + user["surname"])

    var sectionInfoObj = getSectionInfo(course["id"], course["sectionId"]);
    var sectionInfo=JSON.parse(sectionInfoObj.responseText);

    $("#update-form").submit(function(event) { // After clicking on "Update" button, all the information again is got from the fields to send request.
        event.preventDefault();
        var exam_perc = $("#update-exam-perc").val();
        var seating_perc = $("#update-seating-perc").val();
        var attendance_perc = $("#update-attendance-perc").val();

        $.ajax({
            type: "PUT", //We use PUT for update
            url: "http://localhost:8080/rest/section/update?course="+sectionInfo["course_id"]+"&section="+sectionInfo["section_no"]+"&user_id="+sectionInfo["user_id"]+
                 "&number_of_students="+sectionInfo["number_of_students"]+"&number_of_lectures="+sectionInfo["number_of_lectures"]+"&exam_percentage="+exam_perc+
                 "&seating_place_percentage="+seating_perc+"&attendance_percentage="+attendance_perc,
            success: function(response){

                $("#error_upt_msg").html("</br><b style='color:green'>Success!</b>");

            },
            error: function(xhr) {

                $("#error_upt_msg").html("</br><b style='color:red'>Fail!</b>");
            }
        });

    });

    $("#backToAdminPage").click(function(){
        window.location.replace("http://localhost:8080/templates/home/admin-home.html");
    });
});

