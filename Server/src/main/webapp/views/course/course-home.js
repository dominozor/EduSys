function getSeatingPercentageForCourse(courseID, sectionID) { //This function get all prev lectures of a course from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/attendance/getSeatingPercentageForCourse/" + courseID + "/" + sectionID,
        async: false // This option prevents this function to execute asynchronized
    });
}

function getAllSeatingsForLecturerCourse(userID, sectionID, courseID) { //This function get all prev lectures of a course from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/attendance/getAllSeatingsForLecturerCourse/" + userID + "/" + sectionID + "/" + courseID,
        async: false // This option prevents this function to execute asynchronized
    });
}

function getAllSectionInfo() {

    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/section/get/",
        async: false // This option prevents this function to execute asynchronized
    });
}

$(window).on('load', function() {
    // Animate loader off screen
    $(".myModal2").fadeOut("slow");
});

$(document).ready(function() {

    //First and utility.js is imported to course-home.js
    $.ajax({
        url: '/views/main/main.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

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

    $.ajax({
        url: '../../lib/plugins/chartjs/Chart.min.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    $.ajax({
        url: '/views/WS/websocket.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });
    function getNumofStudentsForSection(courseID,sectionID) {

        return $.ajax({
            type: "GET",
            url: "http://localhost:8080/rest/course/getNumofStudentsForSection/" + courseID + "/" + sectionID ,
            async: false // This option prevents this function to execute asynchronized
        });
    }

    function getNumofExamsForSection(courseID,sectionID) {

        return $.ajax({
            type: "GET",
            url: "http://localhost:8080/rest/course/getNumofExamsForSection/" + courseID + "/" + sectionID ,
            async: false // This option prevents this function to execute asynchronized
        });
    }

    function getTotalAttendanceRateForSection(courseID,sectionID) {

        return $.ajax({
            type: "GET",
            url: "http://localhost:8080/rest/attendance/getTotalAttendanceRateForSection/" + courseID + "/" + sectionID ,
            async: false // This option prevents this function to execute asynchronized
        });
    }



    var graphList=[];

    function drawChart() {
        var data = google.visualization.arrayToDataTable(newgraphlist);

        var colorlist = ["#f56954", "#00a65a", "#f39c12", "0066ff"];
        var colorsUsed=[];
        for(var i=0;i<newgraphlist[0].length-1;i++)
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

    var course = JSON.parse(readCookie('course'));
    var user = JSON.parse(readCookie('mainuser'));
    wsSendMessage(user["id"]);
    var sectionInfoObj = getAllSectionInfo();
    var sectionInfo = JSON.parse(sectionInfoObj.responseText);

    var img = document.getElementById("studentImage"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    var img = document.getElementById("studentImage2"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    var img = document.getElementById("studentImage3"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    $("#course-home-btn").click(function(){
        window.location.reload();
    });

    $("#course-dates-btn").click(function(){
        window.location.replace("http://localhost:8080/templates/date/date.html"); //redirects back to lecturer page
    });

    $("#course-exams-btn").click(function(){
        window.location.replace("http://localhost:8080/templates/exam/exam.html"); //redirects back to lecturer page
    });

    $('#studentName').html(user["name"] + " " + user["surname"]);
    $('#studentButtonName').html(user["name"] + " " + user["surname"]);
    $('#stuName').html(user["name"] + " " + user["surname"]);
    $('#userIdHeader').html(user["id"]);


    $('.takeAttImg').click(function(){

        window.localStorage.setItem("course",course["id"]);
        window.localStorage.setItem("section",course["sectionId"]);
        window.location.replace("http://localhost:8080/templates/attendance/imgAttendance.html"); //redirects back to lecturer page

    });

    $('.takeAttendance').click(function(){
        // SHOW overlay
        document.getElementById('loading-gif').style.display = 'block';
        // Retrieve data:
        $.ajax({
            url: "http://localhost:8080/rest/section/takeAttendance/" + course["id"] + "/"  + course["sectionId"],
            type: 'POST',
            success: function(data){
                // onSuccess fill #ajax-box with response data:
                $('#ajax-box').html(data);
                // HIDE the overlay:
                document.getElementById('loading-gif').style.display = 'none';
            }
        });
        // Prevent default action of link:
        return false;
    });

    $('.firstLesson').click(function(){
        // SHOW overlay
        document.getElementById('loading-gif').style.display = 'block';
        // Retrieve data:
        $.ajax({
            url: "http://localhost:8080/rest/section/firstLesson/" + course["id"] + "/"  + course["sectionId"],
            type: 'POST',
            success: function(data){
                // onSuccess fill #ajax-box with response data:
                $('#ajax-box').html(data);
                // HIDE the overlay:
                document.getElementById('loading-gif').style.display = 'none';
            }
        });
        // Prevent default action of link:
        return false;
    });

    var courseListObj=getAllCourses(user["id"],user["role"]);
    var courseList=JSON.parse(courseListObj.responseText);
    var htmlString = "";

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

    var numStudents;
    numStudents=getNumofStudentsForSection(course["id"],course["sectionId"]).responseText;

    var numOfExams;
    numOfExams = getNumofExamsForSection(course["id"],course["sectionId"]).responseText;

    var attendanceRateObj;
    attendanceRateObj = getTotalAttendanceRateForSection(course["id"],course["sectionId"]);
    console.log(attendanceRateObj);
    var attendanceRateList=JSON.parse(attendanceRateObj.responseText);
    console.log(attendanceRateList);
    var percentageRate = parseInt(attendanceRateList[0]["totalstu"]) / parseInt(attendanceRateList[0]["mult"]);
    percentageRate = percentageRate *100;



    var  rankList = JSON.parse(localStorage.getItem('PieData'));

    var ranks=[];
    for(var i =0;i<rankList.length;i++)
    {
        var templist=[];
        templist.push(rankList[i]["label"]);
        templist.push(rankList[i]["value"]);
        ranks.push(templist);
    }

    ranks.sort(function(a, b) {
        return parseFloat(a[1]) - parseFloat(b[1]);
    });

    var coursesectionid = course["id"] + "-" + course["sectionId"];

    var ind=0;
    for(var i =0 ;i< ranks.length;i++)
    {
        if(ranks[i][0]===coursesectionid){
            ind=i+1;
            break;
        }
    }


    var newind=ranks.length-ind+1;

    var courseRank=newind;


    document.getElementById("coursesTreeView").innerHTML = htmlString;

    document.getElementById("contentHeader").innerHTML = '<h1>' + course["id"] + " " + course["name"] + " / Section " + course["sectionId"] + '</h1>';

    document.getElementById("numOfStudents").innerHTML = "<h3>" + numStudents + "</h3>" + "<p>Students</p>";

    document.getElementById("numOfExamsGraded").innerHTML = "<h3>" + numOfExams + "</h3>" + "<p>Exams and Assignments Graded</p>";

    document.getElementById("attendanceRate").innerHTML = "<h3>" + "%" + percentageRate + "</h3>" + "<p>Attendance Rate</p>";

    document.getElementById("rankOfCourse").innerHTML = "<h3>" + courseRank + "</h3>" + "<p>Rank Among Your Courses</p>";



    //var seatPercentageListObj = getSeatingPercentageForCourse(course["id"],course["sectionId"]);
    //var seatPercentageList = JSON.parse(seatPercentageListObj.responseText);
    //var lenSeat = seatPercentageList.length;

    //console.log(lenSeat);


    var newgraphlist=[];

    graphList = JSON.parse(localStorage.getItem('graphList'));


    var coursesectionid = course["id"] + "-" + course["sectionId"];

    var index = graphList[0].indexOf(coursesectionid);

    var templist=[];

    templist.push("Year");
    templist.push(graphList[0][index]);

    newgraphlist.push(templist);

    for(var i=1;i<graphList.length;i++)
    {
        if(graphList[i][index]!='0'){

            var tempdate;
            tempdate=graphList[i][0];

            var year = tempdate.substring(0, 4);

            var month = tempdate.substring(5,7);

            var day = tempdate.substring(8,10);

            if(day<30)
            {
                day = parseInt(day)+1;
            }

            if(day==31)
            {
                day = 1;
                month = parseInt(month)+1;
                if(month==13)
                {
                    month=1;
                    year=parseInt(year)+1;
                }
            }
            month= parseInt(month)-1;

            var element=[];

            element.push(new Date(year,month,day));

            element.push(graphList[i][index]);

            newgraphlist.push(element);

        }


    }

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);




    var numberOfRow = 0;
    var numberOfSeat = 0;

    for(var i=0; i<sectionInfo.length; i++) {
        var class_size = sectionInfo[i]["class_size"];
        var old_row_number = "";
        var old_seat_number = "";
        var flag = 0;

        for(var i=0; i<class_size.length; i++) {
            if(flag == 0) {
                if(class_size[i] != "x") {
                    old_row_number += class_size[i];
                }
                else
                    flag = 1;
            }
            else
                old_seat_number += class_size[i];
        }

        numberOfRow = Math.max(parseInt(old_row_number, 10), numberOfRow);
        numberOfSeat = Math.max(parseInt(old_seat_number, 10), numberOfSeat);
    }



    var zz=[];

    for(var i=0; i<numberOfRow; i++) {
        var zzRow = [];
        for(var j=0; j<numberOfSeat; j++) {
            zzRow.push(0);
        }
        zz.push(zzRow);
    }




    var lecturerSeatingObj=getAllSeatingsForLecturerCourse(user["id"],course["sectionId"], course["id"]);
    var lecturerSeatingList=JSON.parse(lecturerSeatingObj.responseText);
    console.log(lecturerSeatingList);
    var pieChartArray =[];
    var seatCounter=0;

    for(var i = 0; i<lecturerSeatingList.length;i++)
    {

        for(var j=0; j<zz.length; j++) {
            if(lecturerSeatingList[i]["distance"]>=j*100 && lecturerSeatingList[i]["distance"]<(j+1)*100)
            {
                var seat;
                seat=Math.floor(lecturerSeatingList[i]["leftcoor"]/20);
                zz[j][seat] += 1;
                pieChartArray.push(j);
                seatCounter++;
            }
        }


    }


    var xx=[];
    var yy=[];

    for(var i =0 ;i< 15; i++)
    {
        xx.push(i.toString());
        yy.push(i.toString());
    }


    var xList = [];
    var yList = [];



    for(var i=0; i<numberOfSeat; i++) {
        xList.push('x' + i.toString());
    }

    for(var i=0; i<numberOfRow; i++) {
        yList.push('y' + i.toString());
    }

    var data = [
        {
            z : zz,
            x: xList,
            y: yList,
            type: 'heatmap'
        }
    ];

    Plotly.newPlot('myDiv', data);


    console.log(zz);
    console.log(numberOfRow);

    var firstrows,secondrows,thirdrows;
    var fr=0;
    var sr=0;
    var tr=0;

    if(numberOfRow%3==0)
    {
        firstrows=numberOfRow/3;
        secondrows=numberOfRow/3;
        thirdrows=numberOfRow/3;
    }

    if(numberOfRow%3==1)
    {
        firstrows=Math.floor(numberOfRow/3);
        secondrows=Math.floor(numberOfRow/3);
        thirdrows=Math.ceil(numberOfRow/3);
    }


    if(numberOfRow%3==2)
    {
        firstrows=Math.floor(numberOfRow/3);
        secondrows=Math.ceil(numberOfRow/3);
        thirdrows=Math.ceil(numberOfRow/3);
    }
    console.log(pieChartArray);
    console.log( firstrows + " " + secondrows + " " + thirdrows);

    for(var i=0;i<pieChartArray.length;i++)
    {
        if(pieChartArray[i]< firstrows)
        {
            fr++;
        }
        else if((pieChartArray[i] >= firstrows) && (pieChartArray[i]<(secondrows+firstrows)))
        {
            sr++;
        }
        else
        {
            tr++;
        }
    }
    console.log(fr + " " + sr + " " + tr);

    //-------------
    //- PIE CHART -
    //-------------
    // Get context with jQuery - using jQuery's .get() method.
    var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
    var pieChart = new Chart(pieChartCanvas);
    var PieData = [
        {
            value: fr,
            color: "#f56954",
            highlight: "#f56954",
            label: "First Three Rows"
        },
        {
            value: sr,
            color: "#00a65a",
            highlight: "#00a65a",
            label: "Middle Three Rows"
        },
        {
            value: tr,
            color: "#f39c12",
            highlight: "#f39c12",
            label: "Back Three Rows"
        },
    ];
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










});