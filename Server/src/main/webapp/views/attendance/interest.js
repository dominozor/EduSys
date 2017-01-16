/**
 * Created by ata2 on 27.12.2016.
 */

function getInterestForStudent(userid, attendanceid) { //This function gets a specific interest data of a student for an attendance from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/attendance/getInterestForAttendance/" +userid+ "/" +attendanceid,
        async: false // This option prevents this function to execute asynchronized
    });
}

$(document).ready(function(){
    var inter,user,intList,intListP;
    $.ajax({ //While importing utility.py, other fields are filled with the information that is read from cookie if the result is success.
        url: '/views/utility/utility.js',
        dataType: 'script',
        async: false,
        success: function(response) {
            user = JSON.parse(readCookie('mainuser'));
            var img = document.getElementById("studentImage"); //This puts the profile picture of the student to the home page.
            img.src = String(user["ppic"]);

            $('#studentName').html(user["name"] + " " + user["surname"]);
            $('#studentButtonName').html(user["name"] + " " + user["surname"]);
            $('#stuName').html(user["name"] + " " + user["surname"]);

            inter = JSON.parse(readCookie('inter'));
            console.log(user["id"],inter["id"]);
            intList=getInterestForStudent(user["id"],inter["id"]);
            intListP=JSON.parse(intList.responseText);
            $("#seating-distance").html(intListP[0]["distance"]);
            $("#spc").html(intListP[0]["topcoor"]);
            $("#spb").html(intListP[0]["bottomcoor"]);
            $("#spl").html(intListP[0]["leftcoor"]);
            $("#spr").html(intListP[0]["rightcoor"]);


        }
    });
    $("#backToAttendancePage").click(function(){
        eraseCookie("inter"); // If user wants to go back to the attendance page, there is no need for this cookie
         window.location.replace("http://localhost:8080/templates/attendance/attendance.html");
    });
});
