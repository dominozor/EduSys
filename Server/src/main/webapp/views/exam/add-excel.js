$(document).ready(function(){
    var exam;
    var len;
    var user;

    $.ajax({
        url: '/views/main/main.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });
    $.ajax({
        url: '/views/utility/utility.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    $.ajax({
        url: '/views/WS/websocket.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    exam = JSON.parse(readCookie('examCourse'));
    user = JSON.parse(readCookie('mainuser'));
    len = readCookie(('length'));
    wsSendMessage(user["id"]);
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


    $("#add-excForm").html('<form action="rest/file/upload" method="post" enctype="multipart/form-data"> <p> Select a file : <input type="file" name="file" size="45" /> </p> <p>Target Upload Path : <input type="text" name="examID" /></p> <input type="submit" value="Upload It" /> </form>');



    $("#backToExamListPage").click(function(){
        window.location.replace("http://localhost:8080/templates/exam/exam-list.html");
    });
});

