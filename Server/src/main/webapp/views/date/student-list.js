/**
 * Created by ata2 on 12.12.2016.
 */
function getUserFromDate(sectionId, course, date) { //This function get all students' names that attend a lecture.
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/attendance/getAttendanceFromDate/" + course + "/" + sectionId + "/" + date,
        async: false // This option prevents this function to execute asynchronized
    });
}

$(document).ready(function(){
    var StudentAttList, StudentAttListObj;

    $.ajax({
        url: '/views/utility/utility.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    StudentAttListObj=getUserFromDate(1, 490, '1-1-2015');
    StudentAttList=JSON.parse(StudentAttListObj.responseText);
    var captions=["Students"];
    $('#student-list').html(createStudentTable(StudentAttList,captions));


    $("#backDatePage").click(function(){
        window.location.replace("http://localhost:8080/templates/date/date.html"); //redirects back to lecturer page
    });

});
