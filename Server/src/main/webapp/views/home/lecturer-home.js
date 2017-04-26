var graphList=[];
function getTotalNumOfStudent(userID) { //This function get all prev lectures of a course from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/course/getTotalNumOfStudents/" + userID,
        async: false // This option prevents this function to execute asynchronized
    });
}

function getAttendancePercentageForLecturer() { //This function get all prev lectures of a course from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/attendance/getAttendancePercentageForLecturer",
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
///degisiklik
function getAllSeatingsForLecturer(userID) { //This function get all prev lectures of a course from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/attendance/getAllSeatingsForLecturer/" + userID,
        async: false // This option prevents this function to execute asynchronized
    });
}
///degisiklik

function getAllSectionInfo() {

    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/section/get/",
        async: false // This option prevents this function to execute asynchronized
    });
}



/*function drawChart() {
    var data1 = new google.visualization.DataTable();
    data1.addColumn('number', 'X');
    data1.addColumn('number', 'Y 1');


    var colorlist = ["#f56954", "#00a65a", "#f39c12", "0066ff"];
    var colorsUsed=[];
    for(var i=0;i<graphList[0].length-1;i++)
    {
        colorsUsed.push(colorlist[i]);
    }

    data1.addRows([
        [1, 3],
        [2, 6],
        [5, 5],
        [6, 8],
        [8, 2],
        [9, 5],
        [10, 5],
        [12, 4],
        [13, 8]
    ]);

    var data2 = new google.visualization.DataTable();
    data2.addColumn('number', 'X');
    data2.addColumn('number', 'Y 2');

    data2.addRows([
        [1, 5],
        [3, 1],
        [4, 3],
        [5, 9],
        [6, 4],
        [8, 5],
        [9, 7],
        [11, 7],
        [16, 3]
    ]);


    var options = {
        interpolateNulls: true,
        explorer: {
            actions: ['dragToZoom', 'rightClickToReset'],
            axis: 'horizontal',
            keepInBounds: true,
            maxZoomIn: 32.0},

    };


    var joinedData = google.visualization.data.join(data1, data2, 'full', [[0, 0]], [1], [1]);

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

    chart.draw(joinedData, options);
}*/



 function drawChart() {

 var data = google.visualization.arrayToDataTable(graphList);
     console.log(graphList);

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
     interpolateNulls : true,

     };

     var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
     chart.draw(data, options);
 }

$(window).on('load', function() {
    // Animate loader off screen
    $(".myModal2").fadeOut("slow");
});

$(document).ready(function() {

    var courseList, courseListObj;
    var user;
    var htmlString = "";
    //First eduUser.js and utility.js is imported to admin-home.js

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
        url: '/views/WS/websocket.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    user = JSON.parse(readCookie('mainuser'));
    console.log(user);
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

    var totalNumStu = getTotalNumOfStudent(user['id']).responseText;
    document.getElementById("stuNum").innerHTML = "<h3>" + totalNumStu + "</h3>";


    document.getElementById("lectRate").innerHTML = "<h3>" + "3 out of 20" + "</h3>";



    var attendanceAverageListObj = getAttendancePercentageForLecturer();
    var attendanceAverageList = JSON.parse(attendanceAverageListObj.responseText);

    var sectionInfoObj = getAllSectionInfo();
    var sectionInfo = JSON.parse(sectionInfoObj.responseText);

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

    console.log(attendanceAverageList);

    console.log(courseList);

    var thislecturerrate=0;
    var otherlecturers=0;

    for(var i=0;i<courseList.length;i++){
        var courseId = courseList[i]["id"];
        var sectionId = courseList[i]["sectionId"];

        for(var j=0;j<attendanceAverageList.length;j++) {
            var courseId2 = attendanceAverageList[j]["courseid"];
            var sectionId2 = attendanceAverageList[j]["sectionno"];
            var val = attendanceAverageList[j]["totalstu"]/attendanceAverageList[j]["mult"]*100;

            if(courseId === courseId2 && sectionId === sectionId2) {
                console.log("val = " + val);
                thislecturerrate+=val;
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

    for(var i=0;i<attendanceAverageList.length;i++)
    {
        var k=0;
        for(var j=0;j<courseList.length;j++)
        {
            if(courseList[j]["id"]==attendanceAverageList[i]["courseid"])
            {
                k++;
            }
        }
        if(k==0)
            console.log("ders"+ attendanceAverageList[i]["courseid"]);

    }

    //////////////////////////////
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

    window.localStorage.setItem("PieData", JSON.stringify(PieData)); // Saving

    pieChart.Doughnut(PieData, pieOptions);



    var dailyAttendanceListObj = getAttendancePercentageForLecturerPerDay(user["id"]);
    var dailyAttendanceList = JSON.parse(dailyAttendanceListObj.responseText);


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
            element.push(null);
        }

        var searchIndexTemp = dailyAttendanceList[i]["courseid"] + "-" + dailyAttendanceList[i]["sectionno"];

        var index = coursesList.indexOf(searchIndexTemp);

        var percentageValue = (dailyAttendanceList[i]["totalAtt"] / dailyAttendanceList[i]["totalCapacity"])*100;

        element[index]=percentageValue;

        graphList.push(element);

        window.localStorage.setItem("graphList", JSON.stringify(graphList)); // Saving


    }

////degisiklik


    var lecturerSeatingObj=getAllSeatingsForLecturer(user["id"]);
    var lecturerSeatingList=JSON.parse(lecturerSeatingObj.responseText);


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

    //window.alert(numberOfRow + " " + numberOfSeat);


    var zz=[];

    for(var i=0; i<numberOfRow; i++) {
        var zzRow = [];
        for(var j=0; j<numberOfSeat; j++) {
            zzRow.push(0);
        }
        zz.push(zzRow);
    }


    console.log(lecturerSeatingList);
    var seatCounter=0;

    for(var i = 0; i<lecturerSeatingList.length;i++)
    {

        for(var j=0; j<zz.length; j++) {
            if(lecturerSeatingList[i]["distance"]>=j*100 && lecturerSeatingList[i]["distance"]<(j+1)*100)
            {
                var seat;
                seat=Math.floor(lecturerSeatingList[i]["leftcoor"]/20);
                zz[j][seat] += 1;
                seatCounter++;
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



    Plotly.newPlot('myDiv', data);






     google.charts.load('current', {'packages':['corechart']});
     google.charts.setOnLoadCallback(drawChart);

    /*google.load('visualization', '1', {packages:['corechart'], callback: drawChart});*/




});