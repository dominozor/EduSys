function getExcelTemplate() { //This function gets all grades data of a student from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/exam/getExcel",
        async: false  // This option prevents this function to execute asynchronized
    });
}

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
        url: 'http://malsup.github.com/jquery.form.js',
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


    jQuery("#upload-form").submit(function(e){
        //The following stops the form from redirecting
        e.preventDefault();
        var exam=window.localStorage.getItem("examID");
        document.getElementById('loading-gif').style.display = 'block';
        jQuery("#upload-form").ajaxSubmit({
            type: 'POST',
            url: 'http://localhost:8080/rest/upload/excelGrades/'+exam,
            data: jQuery('#upload-form').serialize(),
            success: function (msg) {
                //The data variable will contain the response data
                //if it's successful, you can no redirect wherever you want
                document.getElementById('loading-gif').style.display = 'none';
                window.location.href = "http://localhost:8080/templates/exam/exam.html";
            },
            error: function(msg) {

                $("#error_rgs_msg").html("<b style='color:red'>Fail...</b>");
            }
        });
    });
    $("#getExcelTemplate").click(function(){
        getExcelTemplate();
    });

    $("#backToExamListPage").click(function(){
        window.location.replace("http://localhost:8080/templates/exam/exam.html");
    });
});



