$(document).ready(function(){
    var exam;
    var len;
    var user;

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

    exam = JSON.parse(readCookie('exam'));
    user = JSON.parse(readCookie('mainuser'));
    len = readCookie(('length'));

    var img = document.getElementById("studentImage"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    var img = document.getElementById("studentImage2"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    var img = document.getElementById("studentImage3"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    $('#studentName').html(user["name"] + " " + user["surname"])
    $('#studentButtonName').html(user["name"] + " " + user["surname"])
    $('#stuName').html(user["name"] + " " + user["surname"])
    $('#userIdHeader').html(user["id"]);

    var courseListObj=getAllCourses(user["id"],user["role"]);
    var courseList=JSON.parse(courseListObj.responseText);
    var captions=["Course Id", "Name", "Section"];
    var htmlString = "";
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

    $("#add-new-grade-form").submit(function(event) { // All the information about user is got from the fields.
        event.preventDefault();
        var userid = $("#user-id").val(); //Name of the user
        var grade = $("#grade").val(); //Surname of the user
        var average=Number(exam["average"]);
        average = average*Number(len) + Number(grade);
        average = average / (Number(len)+1);
        average = average.toString();
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/rest/studentGrade/add?userId="+userid+"&examId="+exam["examId"]+"&grade="+grade,
            success: function(response){

                $("#error_rgs_msg").html("<b style='color:green'>Success...</b>");


            },
            error: function(xhr) {

                $("#error_rgs_msg").html("<b style='color:red'>Fail...</b>");
            }
        });

        $.ajax({
            type: "PUT",
            url: "http://localhost:8080/rest/exam/update?ID="+exam["examId"]+"&course="+exam["courseId"]+"&section="+exam["sectionNo"]+"&type="+exam["type"]+"&average="+average,
            success: function(response){

                $("#error_rgs_msg").html("<b style='color:green'>Success...</b>");


            },
            error: function(xhr) {

                $("#error_rgs_msg").html("<b style='color:red'>Fail...</b>");
            }
        });

        window.location.replace("http://localhost:8080/templates/exam/exam-list.html");

    });

    $("#backToExamListPage").click(function(){
        window.location.replace("http://localhost:8080/templates/exam/exam-list.html");
    });
});

