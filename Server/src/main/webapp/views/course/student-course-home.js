/**
 * Created by onur on 29.03.2017.
 */

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

function getSection(courseID, sectionID) {

    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/section/get/" + courseID + "/" + sectionID,
        async: false
    })
}

function getDatesOfCourse(course, sectionId) {
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/course/getSectionDates/" + course + "/" + sectionId,
        async: false
    });
}

function getCourseAttForStudent(id, course) { //This function gets a specific course attendance data of a student from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/attendance/getCourseAttendance/" +id+ "/" +course,
        async: false // This option prevents this function to execute asynchronized
    });
}

$(document).ready(function() {


    $.ajax({
        url: '/views/main/main.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });
    //First and utility.js is imported to course-home.js
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
        url: '/views/attendance/attendance.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    $.ajax({
        url: '/views/WS/websocket.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });


    $.ajax({
        url: '../../lib/plugins/chartjs/Chart.min.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });



    var user = JSON.parse(readCookie('mainuser'));
    wsSendMessage(user["id"]);
    var img = document.getElementById("studentImage"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    var img = document.getElementById("studentImage2"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    var img = document.getElementById("studentImage3"); //This puts the profile picture of the student to the home page.
    img.src = String(user["ppic"]);

    $('#studentName').html(user["name"] + " " + user["surname"]);
    $('#studentButtonName').html(user["name"] + " " + user["surname"]);
    $('#stuName').html(user["name"] + " " + user["surname"]);
    $('#userIdHeader').html(user["id"]);

    var courseListObj=getAllCourses(user["id"],user["role"]);
    var courseList=JSON.parse(courseListObj.responseText);
    var htmlString = "";

    for(var i=0;i<courseList.length;i++){
        var courseId = courseList[i]["id"];
        var sectionId = courseList[i]["sectionId"];
        var courseName = courseList[i]["name"];
        htmlString += '<li><a href="#" onClick="goToStudentCourseHome('
        htmlString += courseId + ',' + "'" + courseName + "'" +  ',' + sectionId + ')"><i class="fa fa-circle-o"></i>';
        htmlString += courseId;
        htmlString += " - ";
        htmlString += sectionId;
        htmlString += '</a></li>';
    }
    document.getElementById("coursesTreeView").innerHTML = htmlString;

    var course = JSON.parse(readCookie('course'));
    document.getElementById("contentHeader").innerHTML = '<h1>' + course["id"] + " " + course["name"] + " / Section " + course["sectionId"] + '</h1>';

    var numOfStudents = getNumofStudentsForSection(course["id"], course["sectionId"]).responseText;
    document.getElementById("numOfStudents").innerHTML = "<h3>" + numOfStudents + "</h3>" + "<p>Students</p>";


    var numOfExams = getNumofExamsForSection(course["id"], course["sectionId"]).responseText;
    document.getElementById("numOfExamsGraded").innerHTML = "<h3>" + numOfExams + "</h3>" + "<p>Exams and Assignments Graded</p>";


    var courAttListObj = getCourseAttForStudent(user["id"], course["id"]);
    var courAttList = JSON.parse(courAttListObj.responseText);

    var totalNumberOfAttendanceObj = getNumberOfAttendance(course["id"], course["sectionId"]);
    var totalNumberOfAttendance = JSON.parse(totalNumberOfAttendanceObj.responseText);

    var sectionInfoObj = getSection(course["id"], course["sectionId"]);
    var sectionInfo = JSON.parse(sectionInfoObj.responseText);

    document.getElementById("attendanceRate").innerHTML = "<h3>" + "%" + parseInt((courAttList.length/totalNumberOfAttendance[0]["attendanceNumber"])*100, 10) + "</h3>" + "<p>Attendance Rate</p>";


    $('#goToHome').click(function () {
        window.location.reload();
    });

    $('#goToDates').click(function () {
        window.location.replace("http://localhost:8080/templates/attendance/attendance.html");
    });

    $('#goToExams').click(function () {
        window.location.replace("http://localhost:8080/templates/exam/exam.html");
    });

    var courseInterestObj = getInterestsOfCourses(user["id"]);
    var courseInterest = JSON.parse(courseInterestObj.responseText);

    var numberOfRow = 0;
    var numberOfSeat = 0;

    var class_size = sectionInfo["class_size"];
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


    //window.alert(numberOfRow + " " + numberOfSeat);


    var zz=[];

    for(var i=0; i<numberOfRow; i++) {
        var zzRow = [];
        for(var j=0; j<numberOfSeat; j++) {
            zzRow.push(0);
        }
        zz.push(zzRow);
    }

    var pieChartArray =[];
    var seatCounter=0;

    for(var i = 0; i<courseInterest.length;i++)
    {
        if(courseInterest[i]["courseId"] == course["id"] && courseInterest[i]["sectionId"] == course["sectionId"]) {
            for (var j = 0; j < zz.length; j++) {
                if (courseInterest[i]["distance"] >= j * 100 && courseInterest[i]["distance"] < (j + 1) * 100) {
                    var seat;
                    seat = Math.floor(courseInterest[i]["leftcoor"] / 20);
                    zz[j][seat] += 1;
                    pieChartArray.push(j);
                    seatCounter++;
                }
            }
        }
    }


    for(var i=0;i<zz.length;i++)
    {
        for(var j=0 ; j<zz[i].length;j++)
        {
            zz[i][j]=(zz[i][j]/seatCounter)*100;
        }
    }


    var xx=[];
    var yy=[];

    for(var i =0 ;i< 15; i++)
    {
        xx.push(i.toString());
        yy.push(i.toString());
    }

    /*for(var i =0 ;i< 15; i++)
     {
     var tempz=[];
     for(var j =0 ;j< 9; j++)
     {
     tempz.push(Math.floor(Math.random() * 101) -10 );

     }
     zz.push(tempz);
     }*/

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

    Plotly.newPlot('heatmapContainer', data);


    ///////////////////////
    //-------Seating Chart---------\\
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
    //console.log(pieChartArray);
    //console.log( firstrows + " " + secondrows + " " + thirdrows);

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
        else if((pieChartArray[i]>=(secondrows+firstrows)))
        {
            tr++;
        }
    }
    //console.log(fr + " " + sr + " " + tr);

    //-------------
    //- PIE CHART -
    //-------------
    // Get context with jQuery - using jQuery's .get() method.
    var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
    var pieChart = new Chart(pieChartCanvas);
    var PieData = [
        {
            value: fr,
            color: "#00a65a",
            highlight: "#00a65a",
            label: "First Three Rows"
        },
        {
            value: sr,
            color: "#f39c12",
            highlight: "#f39c12",
            label: "Middle Three Rows"
        },
        {
            value: tr,
            color: "#f56954",
            highlight: "#f56954",
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


    //////////////////////////////////
    //----------- Attendance Line Chart

    var studentAttObj = getCourseAttForStudent(user["id"], course["id"]);
    var studentAtt = JSON.parse(studentAttObj.responseText);

    var courseAttObj = getDatesOfCourse(course["id"], course["sectionId"]);
    var courseAtt = JSON.parse(courseAttObj.responseText);

    var newgraphlist=[];

    var templist=[];

    var studentAttFlag = false;

    templist.push("Year");
    templist.push(course["name"]);

    newgraphlist.push(templist);
    console.log(courseAtt.length);
    for(var i=0;i<courseAtt.length;i++)
    {
        studentAttFlag = false;
        var tempdate=courseAtt[i]["date"];

        var year = Number(tempdate.substring(0, 4));

        var month = Number(tempdate.substring(4,6));

        var day = Number(tempdate.substring(6,8));

        if(day<30)
        {

            if(day==28 && month==2)
            {
                day=1;
                month= parseInt(month)+1;
            }
            else
                day = parseInt(day)+1;
        }
        if(day==30)
        {
            if(month==4 || month==6 || month==9 || month==11 )
            {
                day=1;
                month = parseInt(month)+1;
            }

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

        //console.log(year + " " + month + " " + day);
        element.push(new Date(year,month,day));

        for(var j=0; j<studentAtt.length; j++) {
            if (courseAtt[i]["date"] == studentAtt[j]["date"]) {
                studentAttFlag = true;
                //console.log(courseAtt[i]["date"] + " " + studentAtt[j]["date"]);
                console.log("girdi " + element[0]);
                element.push(1);
            }
        }

        if(!studentAttFlag) {
            element.push(0);
            console.log(element[0]);
        }
        newgraphlist.push(element);
    }

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable(
            newgraphlist
        );

        var options = {
            hAxis: {title: 'Date', titleTextStyle: {color: '#333'}},
            vAxis: {title: 'Attendance', minValue: 0},
            pointSize: 7,
            explorer: {
                actions: ['dragToZoom', 'rightClickToReset'],
                axis: 'horizontal',
                keepInBounds: true,
                maxZoomIn: 32.0
            },
            colors: ['#D44E41', '#000000'],
            interpolateNulls : true,
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }

});
