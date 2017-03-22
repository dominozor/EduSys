var graphList=[];
function getTotalNumOfStudent(userID) { //This function get all prev lectures of a course from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/course/getTotalNumOfStudents/" + userID,
        async: false // This option prevents this function to execute asynchronized
    });
}

function getAttendancePercentageForLecturer(userID) { //This function get all prev lectures of a course from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/attendance/getAttendancePercentageForLecturer/" + userID,
        async: false // This option prevents this function to execute asynchronized
    });
}

function getAttendancePercentageForLecturerPerDay(userID) { //This function get all prev lectures of a course from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/attendance/getAttendancePercentageForLecturerPerDay/" + userID,
        async: false // This option prevents this function to execute asynchronized
    });
}



function drawChart() {
    console.log(graphList);
    var data = google.visualization.arrayToDataTable(graphList);

    var colorlist = ["#f56954", "#00a65a", "#f39c12", "0066ff"];
    var colorsUsed=[];
    for(var i=0;i<graphList[0].length-1;i++)
    {
        colorsUsed.push(colorlist[i]);
    }

    var options = {
        hAxis: {title: 'Date',  titleTextStyle: {color: '#333'}},
        vAxis: {title: 'Attendance Percentage', minValue: 0},
        pointSize: 7,
        explorer: {
            actions: ['dragToZoom', 'rightClickToReset'],
            axis: 'horizontal',
            keepInBounds: true,
            maxZoomIn: 32.0},
        colors: colorsUsed,
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}


$(document).ready(function() {

    var courseList, courseListObj;
    var user;
    var htmlString = "";
    //First eduUser.js and utility.js is imported to admin-home.js

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

    user = JSON.parse(readCookie('mainuser'));

    var img = document.getElementById("studentImage"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    var img = document.getElementById("studentImage2"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    var img = document.getElementById("studentImage3"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);


    $('#studentName').html(user["name"] + " " + user["surname"]);
    $('#studentButtonName').html(user["name"] + " " + user["surname"]);
    $('#stuName').html(user["name"] + " " + user["surname"]);

    courseListObj=getAllCourses(user["id"],user["role"]);
    courseList=JSON.parse(courseListObj.responseText);
    var captions=["Course Id", "Name", "Section"];
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

    $('.courseInfo').click(function () {
        var row=parseInt($(this)[0].id.substr(6)); //Row ids are course#(number) so first 6 characters("course") is not important.
        var course=courseList[row];// After parsing row, now we have row index for courselist.
        createCookie('course',JSON.stringify(course),1); // A cookie is created for the course page.Cookie has the information about course and keeps it as a JSON.
        window.location.replace("http://localhost:8080/templates/course/course.html"); //That redirects to course page
    });

    $('.courseDate').click(function () {
        var row=parseInt($(this)[0].id.substr(10)); //Row ids are course#(number) so first 6 characters("course") is not important.
        var course=courseList[row];// After parsing row, now we have row index for courselist
        createCookie('lecturerCourse',JSON.stringify(course),1); // A cookie is created for the course page.Cookie has the information about course and keeps it as a JSON.
        window.location.replace("http://localhost:8080/templates/date/date.html"); //That redirects to dates page
    });
    $('.courseExam').click(function () {
        var row=parseInt($(this)[0].id.substr(10)); //Row ids are courseExam#(number) so first 10 characters("courseExam") is not important.
        var course=courseList[row];// After parsing row, now we have row index for courselist
        createCookie('examCourse',JSON.stringify(course),1); // A cookie is created for the course page.Cookie has the information about course and keeps it as a JSON.
        window.location.replace("http://localhost:8080/templates/exam/exam.html"); //That redirects to dates page
    });

    $('.takeAttendance').click(function(){
        var row=parseInt($(this)[0].id.substr(14)); //Row ids are courseExam#(number) so first 10 characters("courseExam") is not important.
        var course=courseList[row];// After parsing row, now we have row index for courselist
        // SHOW overlay
        $("#img").show();
        // Retrieve data:
        $.ajax({
            url: "http://localhost:8080/rest/section/takeAttendance/" + course["id"] + "/"  + course["sectionId"],
            type: 'POST',
            success: function(data){
                // onSuccess fill #ajax-box with response data:
                $('#ajax-box').html(data);
                // HIDE the overlay:
                $("#img").hide();
            }
        });
        // Prevent default action of link:
        return false;
    });

    $('.firstLesson').click(function(){
        var row=parseInt($(this)[0].id.substr(11)); //Row ids are courseExam#(number) so first 10 characters("courseExam") is not important.
        var course=courseList[row];// After parsing row, now we have row index for courselist
        // SHOW overlay
        $("#img").show();
        // Retrieve data:
        $.ajax({
            url: "http://localhost:8080/rest/section/firstLesson/" + course["id"] + "/"  + course["sectionId"],
            type: 'POST',
            success: function(data){
                // onSuccess fill #ajax-box with response data:
                $('#ajax-box').html(data);
                // HIDE the overlay:
                $("#img").hide();
            }
        });
        // Prevent default action of link:
        return false;
    });

    var totalNumStu = getTotalNumOfStudent(user['id']).responseText;
    document.getElementById("stuNum").innerHTML = "<h3>" + totalNumStu + "</h3>";

    var attendanceAverageListObj = getAttendancePercentageForLecturer(user["id"]);
    var attendanceAverageList = JSON.parse(attendanceAverageListObj.responseText);

    //-------------
    //- PIE CHART -
    //-------------
    // Get context with jQuery - using jQuery's .get() method.
    var colorList = ["#f56954", "#00a65a", "#f39c12", "0066ff"];
    var counter = 0;
    var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
    var pieChart = new Chart(pieChartCanvas);
    var PieData = [];

    var coursesList = [];
    coursesList.push("Year");


    for(var i=0;i<courseList.length;i++){
        var courseId = courseList[i]["id"];
        var sectionId = courseList[i]["sectionId"];

        for(var j=0;j<attendanceAverageList.length;j++) {
            var courseId2 = attendanceAverageList[j]["courseid"];
            var sectionId2 = attendanceAverageList[j]["sectionno"];
            var val = attendanceAverageList[j]["totalstu"]/attendanceAverageList[j]["mult"]*100;

            if(courseId === courseId2 && sectionId === sectionId2) {

                coursesList.push(courseId + "-" + sectionId);

                var temp = {
                    value: val,
                    color: colorList[counter],
                    highlight: colorList[counter],
                    label: courseId + "-" + sectionId
                };
                counter++;
                if(counter == 4) counter = 0;
                PieData.push(temp);
            }
        }
    }

    var pieOptions = {
        //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke: true,
        //String - The colour of each segment stroke
        segmentStrokeColor: "#fff",
        //Number - The width of each segment stroke
        segmentStrokeWidth: 2,
        //Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout: 50, // This is 0 for Pie charts
        //Number - Amount of animation steps
        animationSteps: 100,
        //String - Animation easing effect
        animationEasing: "easeOutBounce",
        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate: true,
        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale: false,
        //Boolean - whether to make the chart responsive to window resizing
        responsive: true,
        // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
        maintainAspectRatio: true,
        //String - A legend template
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
    };
    //Create pie or doughnut chart
    // You can switch between pie and douhnut using the method below.
    pieChart.Doughnut(PieData, pieOptions);



    var dailyAttendanceListObj = getAttendancePercentageForLecturerPerDay(user["id"]);
    var dailyAttendanceList = JSON.parse(dailyAttendanceListObj.responseText);
    console.log(dailyAttendanceList);

    console.log(coursesList);

    graphList.push(coursesList);

    for(var i=0;i<dailyAttendanceList.length;i++)
    {
        var year = dailyAttendanceList[i]["date"].substring(0, 4);
        var month = dailyAttendanceList[i]["date"].substring(4, 6)-1;
        var day = dailyAttendanceList[i]["date"].substring(6, 8);

        var element=[];

        element.push(new Date(year,month,day));

        for(var j=0;j<coursesList.length-1;j++)
        {
            element.push(0);
        }

        var searchIndexTemp = dailyAttendanceList[i]["courseid"] + "-" + dailyAttendanceList[i]["sectionno"];

        var index = coursesList.indexOf(searchIndexTemp);

        var percentageValue = (dailyAttendanceList[i]["totalAtt"] / dailyAttendanceList[i]["totalCapacity"])*100;

        element[index]=percentageValue;

        graphList.push(element);


    }


    /*['Year', 'Sales', 'Expenses'],
     [new Date(2001,00,01),  30, 50],
     [new Date(2001,01,02),  40, 60],
     [new Date(2001,01,03),  50, 70],
     [new Date(2001,01,04),  60, 50],
     [new Date(2001,01,05),  70, 80],
     [new Date(2001,02,01),  30, 0],
     [new Date(2001,03,01),  30, 0],
     [new Date(2001,04,01),  30, 0],
     [new Date(2001,05,01),  30, 0],
     [new Date(2001,06,01),  30, 0],
     [new Date(2001,07,01),  30, 0],
     [new Date(2001,08,01),  0, 0]
     ]*/



    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);





});