function getCourseDates(sectionId, course) { //This function get all prev lectures of a course from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/course/getSectionDates/" + course + "/" + sectionId,
        async: false // This option prevents this function to execute asynchronized
    });
}

$(document).ready(function(){
    var courDateList, courDateListObj;

    $.ajax({
        url: '/views/utility/utility.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    courDateListObj=getCourseDates(1, 490);
    courDateList=JSON.parse(courDateListObj.responseText);
    var captions=["Date"];
    $('#course-date').html(createDateTable(courDateList,captions));

    $("#backLecturerPage").click(function(){
        window.location.replace("http://localhost:8080/templates/home/lecturer-home.html"); //redirects back to lecturer page
    });

    $(".getStudents").click(function(){
        window.location.replace("http://localhost:8080/templates/date/student-list.html"); //redirects back to lecturer page
    });

});
