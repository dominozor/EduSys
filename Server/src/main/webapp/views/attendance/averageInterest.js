/**
 * Created by onur on 08.03.2017.
 */
function getAverageInterest(course, sectionID, userID) { //This function gets attendance data of all students for a specific course from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/attendance/getAvgInterest/" +course+ "/" +sectionID + "/" + userID,
        async: false // This option prevents this function to execute asynchronized
    });
}

$(document).ready(function(){
    var inter,user, course, avgInterestObj,avgInterest;
    $.ajax({ //While importing utility.py, other fields are filled with the information that is read from cookie if the result is success.
        url: '/views/utility/utility.js',
        dataType: 'script',
        async: false,
        success: function(response) {
            user = JSON.parse(readCookie('mainuser'));
            course  = JSON.parse(readCookie('courseAtt'));

            var img = document.getElementById("studentImage"); //This puts the profile picture of the student to the home page.
            img.src = String(user["ppic"]);

            var img = document.getElementById("studentImage2"); //This puts the profile picture of the student to the home page.
            img.src = String(user["ppic"]);

            var img = document.getElementById("studentImage3"); //This puts the profile picture of the student to the home page.
            img.src = String(user["ppic"]);

            $('#studentName').html(user["name"] + " " + user["surname"]);
            $('#studentButtonName').html(user["name"] + " " + user["surname"]);
            $('#stuName').html(user["name"] + " " + user["surname"]);

            avgInterestObj = getAverageInterest(course["id"], course["sectionNo"], user["id"]);
            avgInterest = JSON.parse(avgInterestObj.responseText);
            $("#seating-distance").html(avgInterest[0]["distance"]);
            $("#spc").html(avgInterest[0]["topcoor"]);
            $("#spb").html(avgInterest[0]["bottomcoor"]);
            $("#spl").html(avgInterest[0]["leftcoor"]);
            $("#spr").html(avgInterest[0]["rightcoor"]);


        }
    });


    $("#backToAttendancePage").click(function(){
        eraseCookie("inter"); // If user wants to go back to the attendance page, there is no need for this cookie
        window.location.replace("http://localhost:8080/templates/attendance/attendance.html");
    });
});
