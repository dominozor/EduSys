function getCourseDates(sectionId, course) { //This function get all prev lectures of a course from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/course/getSectionDates/" + course + "/" + sectionId,
        async: false // This option prevents this function to execute asynchronized
    });
}

$(document).ready(function(){
    var courDateList, courDateListObj;
    var course;

    $.ajax({
        url: '/views/utility/utility.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    course = JSON.parse(readCookie('lecturerCourse'));

    courDateListObj=getCourseDates(course["sectionId"], course["id"]);
    courDateList=JSON.parse(courDateListObj.responseText);
    var captions=["Date"];
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

});
