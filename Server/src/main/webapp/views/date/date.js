function getCourseDates(sectionId, course) { //This function get all prev lectures of a course from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/course/getSectionDates/" + course + "/" + sectionId,
        async: false // This option prevents this function to execute asynchronized
    });
}

function deleteAtt(course) { //This function get all prev lectures of a course from the Rest services of EduSys
    return $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/rest/course/getSectionDates/" + course + "/" + sectionId,
        async: false // This option prevents this function to execute asynchronized
    });
}



$(document).ready(function(){
    var courDateList, courDateListObj;
    var course, user;

    $.ajax({
        url: '/views/utility/utility.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    course = JSON.parse(readCookie('lecturerCourse'));
    user = JSON.parse(readCookie('mainuser'));

    var img = document.getElementById("studentImage"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    var img = document.getElementById("studentImage2"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    var img = document.getElementById("studentImage3"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    $('#studentName').html(user["name"] + " " + user["surname"])
    $('#studentButtonName').html(user["name"] + " " + user["surname"])
    $('#stuName').html(user["name"] + " " + user["surname"])

    courDateListObj=getCourseDates(course["sectionId"], course["id"]);
    courDateList=JSON.parse(courDateListObj.responseText);
    var captions=["Date","Attendance Percentage"];
    $('#course-date').html(createDateTable(courDateList,captions));

    $("#backLecturerPage").click(function(){
        eraseCookie("lecturerCourse"); // If user wants to go back to the lecturer page, there is no need for this cookie
        window.location.replace("http://localhost:8080/templates/home/lecturer-home.html"); //redirects back to lecturer page
    });

    $(".getStudents").click(function(){
        var row=parseInt($(this)[0].id.substr(11));
        var date=courDateList[row];
        createCookie('courseDate',JSON.stringify(date),1);
        window.location.replace("http://localhost:8080/templates/date/student-list.html"); //redirects back to lecturer page
    });


/////////
    $(".deleteAttendance").click(function(){
        var row=parseInt($(this)[0].id.substr(16));
        var date=courDateList[row];
        deleteAtt(course["id"]);
        window.location.replace("http://localhost:8080/templates/date/date.html"); //redirects back to lecturer page
    });



});
