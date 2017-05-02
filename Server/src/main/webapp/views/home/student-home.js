function getAllSectionInfo() {

    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/section/get/",
        async: false // This option prevents this function to execute asynchronized
    });
}


function getAllCourseGradesOfStudent(userid) { //This function gets course grade data of a student from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/user/getExamGrades/"+userid,
        async: false  // This option prevents this function to execute asynchronized
    });
}

function getAttendanceCountsOfStudents(userid) {
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/attendance/getAllAttendanceNumbers/"+userid,
        async: false  // This option prevents this function to execute asynchronized
    });
}

function getAttendanceCountsOfSection(userid) {
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/attendance/getAllAttendanceNumbersForCourse/"+userid,
        async: false  // This option prevents this function to execute asynchronized
    });
}

var graphList=[];

$(window).on('load', function() {
    // Animate loader off screen
    $(".myModal2").fadeOut("slow");
});


$(document).ready(function() {

    var courseList, courseListObj;
    var user;

    //First attendance.js, eduUser.js, utility.js and exam.js areimported to student-home.js
    $.ajax({
        url: '/views/attendance/attendance.js',
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
    $.ajax({
        url: '/views/exam/exam.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    user = JSON.parse(readCookie('mainuser'));

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

    var gradeInfoObj = getAllCourseGradesOfStudent(user["id"]);
    var gradeInfo = JSON.parse(gradeInfoObj.responseText);

    var sectionInfoObj = getAllSectionInfo();
    var sectionInfo = JSON.parse(sectionInfoObj.responseText);

    var coursesObj = listCoursesOfStudent(user["id"]);
    var courses = JSON.parse(coursesObj.responseText);

    graphList.push(courses);

    var attendanceCountsForStudentsObj = getAttendanceCountsOfStudents(user["id"]);
    var attendanceCountsForStudents = JSON.parse(attendanceCountsForStudentsObj.responseText);

    var attendanceCountsOfCoursesObj = getAttendanceCountsOfSection(user["id"]);
    var attendanceCountsOfCourses = JSON.parse(attendanceCountsOfCoursesObj.responseText);

    //This gets the courses of a student and puts the data after creating table of it.
    courseListObj=getAllCourses(user["id"], user["role"]);
    courseList=JSON.parse(courseListObj.responseText);
    var captions=["Course Id", "Name", "Section No"];
    $('#Courses').html(createCourseTable(courseList,captions,2));
    var htmlString="";

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


    $('.courseInfo').click(function () {
        var row=parseInt($(this)[0].id.substr(6)); //Row ids are course#(number) so first 6 characters("course") is not important.
        var course=courseList[row];// After parsing row, now we have row index for courselist.
        createCookie('course',JSON.stringify(course),1); // A cookie is created for the course page.Cookie has the information about course and keeps it as a JSON.
        window.location.replace("http://localhost:8080/templates/course/course.html"); //That redirects to course page
    });



    $('.courseAttendance').click(function () {
        var row=parseInt($(this)[0].id.substr(9)); //Row ids are courseAtt#(number) so first 6 characters("course") is not important.
        var course=courseList[row];// After parsing row, now we have row index for courselist.
        createCookie('course',JSON.stringify(course),1); // A cookie is created for the course page.Cookie has the information about course and keeps it as a JSON.
        window.location.replace("http://localhost:8080/templates/attendance/attendance.html"); //That redirects to course page
    });

    $('.courseGrades').click(function () {
        var row=parseInt($(this)[0].id.substr(10)); //Row ids are courseGrad#(number) so first 6 characters("course") is not important.
        var course=courseList[row];// After parsing row, now we have row index for courselist
        createCookie('courseGrad',JSON.stringify(course),1); // A cookie is created for the course page.Cookie has the information about course and keeps it as a JSON.
        window.location.replace("http://localhost:8080/templates/exam/exam.html"); //That redirects to course page
    });


    //CHARTS!!!!!!!!!

    //Pie Chart Of Ratio Of Interests

    //$('#pieChartInterestCaller').one("click", function () {

        var avgInterestInfoObj = listAverageInterestInfo(user["id"]);
        var avgInterestInfo = JSON.parse(avgInterestInfoObj.responseText);
        var mainInterestInfo = [];
        var interestInfo = [];

        for (var i = 0; i < avgInterestInfo.length; i++) {

            var numberOfAttendanceOfStudent=0;
            for(var j=0; j<attendanceCountsForStudents.length; j++) {
                if(attendanceCountsForStudents[j]["courseID"] == avgInterestInfo[i]["courseId"])
                    numberOfAttendanceOfStudent = attendanceCountsForStudents[j]["attendanceCount"];
            }

            var numberOfAttendanceOfCourse=0;
            for(var j=0; j<attendanceCountsOfCourses.length; j++) {
                if(attendanceCountsOfCourses[j]["courseID"] == avgInterestInfo[i]["courseId"])
                    numberOfAttendanceOfCourse = attendanceCountsOfCourses[j]["attendanceCount"];
            }

            var attendancePerc=0;
            if(numberOfAttendanceOfCourse != 0)
                attendancePerc = parseInt((numberOfAttendanceOfStudent/numberOfAttendanceOfCourse), 10);

            var averageGrade=0;
            var totalGradePercentage=0;
            for(var j=0; j<gradeInfo.length; j++) {
                if(gradeInfo[j]["id"] == avgInterestInfo[i]["courseId"]) {
                    averageGrade += gradeInfo[j]["grade"]*gradeInfo[j]["percentage"];
                    totalGradePercentage++;
                }
            }

            if(totalGradePercentage != 0)
                averageGrade /= totalGradePercentage;

            var seating_place_percentage, exam_percentage, attendance_percentage;

            for(var j=0; j<sectionInfo.length; j++) {
                if (sectionInfo[j]["course_id"] == avgInterestInfo[i]["courseId"] && sectionInfo[j]["section_no"] == avgInterestInfo[i]["sectionId"]) {
                    seating_place_percentage = sectionInfo[j]["seating_place_percentage"];
                    exam_percentage = sectionInfo[j]["exam_percentage"];
                    attendance_percentage = sectionInfo[j]["attendance_percentage"];
                }
            }

            var seatingInfo = (avgInterestInfo[i]["bottomcoor"] - avgInterestInfo[i]["topcoor"]) * (avgInterestInfo[i]["rightcoor"] - avgInterestInfo[i]["leftcoor"]);

            var interestPoint = seatingInfo * seating_place_percentage + averageGrade * exam_percentage + attendancePerc * attendance_percentage;

            mainInterestInfo.push(interestPoint);

            var letters = '0123456789ABCDEF';
            var color = "#";
            for (var j = 0; j < 6; j++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            interestInfo.push({
                "label": (avgInterestInfo[i]["courseId"]).toString(),
                "value": mainInterestInfo[i],
                "color": color
            });
        }

        var pie = new d3pie("pieChartInterest", {
            /*"header": {
             "title": {
             "text": "Ratio of the interest information of the courses of the student",
             "fontSize": 20,
             "font": "open sans"
             },
             },*/
            "footer": {
                "color": "#999999",
                "fontSize": 10,
                "font": "open sans",
                "location": "bottom-left"
            },
            "size": {
                "canvasWidth": 590,
                "pieOuterRadius": "65%"
            },
            "data": {
                "sortOrder": "value-desc",
                "content": interestInfo
            },
            "labels": {
                "outer": {
                    "pieDistance": 32
                },
                "inner": {
                    "hideWhenLessThanPercentage": 1
                },
                "mainLabel": {
                    "fontSize": 11
                },
                "percentage": {
                    "color": "#ffffff",
                    "decimalPlaces": 0
                },
                "value": {
                    "color": "#adadad",
                    "fontSize": 11
                },
                "lines": {
                    "enabled": true
                },
                "truncation": {
                    "enabled": true
                }
            },
            "effects": {
                "pullOutSegmentOnClick": {
                    "effect": "linear",
                    "speed": 400,
                    "size": 8
                }
            },
            "misc": {
                "gradient": {
                    "enabled": true,
                    "percentage": 100
                }
            }
        });
    //});


    //Line Chart Of The Ratio Of Interests
    //$('#lineChartInterestCaller').one("click", function () {
        $('#lineChartInterest').attr("style","height:505px");

        var graphInfo = [];
        var graphLegends = [];
        var courseIndices = {};
        graphLegends.push('Data');

        for(var i=0; i<courses.length; i++) {
            graphLegends.push(courses[i]["id"]);
            courseIndices[courses[i]["id"]] = i+1;
        }
        graphInfo.push(graphLegends);

        var courseInterestObj = getInterestsOfCourses(user["id"]);
        var courseInterest = JSON.parse(courseInterestObj.responseText);

        for(var i=0; i<courseInterest.length; i++) {

            var year = courseInterest[i]["date"].substring(0,4);
            var month = Number(courseInterest[i]["date"].substring(4,6))-1;
            var day = courseInterest[i]["date"].substring(6,8);
            var date = new Date(year, month, day);
            var graphData = [];
            graphData.push(date);

            for(var j=0; j<courses.length; j++)
                graphData.push(null);

            graphInfo.push(graphData);
        }

        for(var i=0; i<courseInterest.length; i++) {

            var numberOfAttendanceOfStudent=0;
            for(var j=0; j<attendanceCountsForStudents.length; j++) {
                if(attendanceCountsForStudents[j]["courseID"] == courseInterest[i]["courseId"])
                    numberOfAttendanceOfStudent = attendanceCountsForStudents[j]["attendanceCount"];
            }

            var numberOfAttendanceOfCourse=0;
            for(var j=0; j<attendanceCountsOfCourses.length; j++) {
                if(attendanceCountsOfCourses[j]["courseID"] == courseInterest[i]["courseId"])
                    numberOfAttendanceOfCourse = attendanceCountsOfCourses[j]["attendanceCount"];
            }

            var attendancePerc=0;
            if(numberOfAttendanceOfCourse != 0)
                attendancePerc = parseInt((numberOfAttendanceOfStudent/numberOfAttendanceOfCourse), 10);


            var averageGrade=0;
            var gradeCounter=0;
            for(var j=0; j<gradeInfo.length; j++) {
                if(gradeInfo[j]["id"] == courseInterest[i]["courseId"]) {
                    averageGrade += gradeInfo[j]["grade"];
                    gradeCounter++;
                }
            }

            if(gradeCounter != 0)
                averageGrade /= gradeCounter;


            var seating_place_percentage, exam_percentage, attendance_percentage;

            for(var j=0; j<sectionInfo.length; j++) {
                if (sectionInfo[j]["course_id"] == courseInterest[i]["courseId"] && sectionInfo[j]["section_no"] == courseInterest[i]["sectionId"]) {
                    seating_place_percentage = sectionInfo[j]["seating_place_percentage"];
                    exam_percentage = sectionInfo[j]["exam_percentage"];
                    attendance_percentage = sectionInfo[j]["attendance_percentage"];
                }
            }

            var seatingInfo = (courseInterest[i]["bottomcoor"] - courseInterest[i]["topcoor"]) * (courseInterest[i]["rightcoor"] - courseInterest[i]["leftcoor"]);

            var interestPoint = seatingInfo * seating_place_percentage + averageGrade * exam_percentage + attendancePerc * attendance_percentage;

            graphInfo[i+1][courseIndices[courseInterest[i]["courseId"]]] = interestPoint;

        }

         google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable(
                graphInfo
            );

            var options = {
                hAxis: {title: 'Date', titleTextStyle: {color: '#333'}},
                vAxis: {title: 'Interest Point', minValue: 0},
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

            var chart = new google.visualization.LineChart(document.getElementById('lineChartInterest'));
            chart.draw(data, options);
        }

    //});



    //Pie Chart Of Ratio Of Attendances

    //$('#pieChartAttendanceCaller').one("click", function () {

        var coursesObj = listCoursesOfStudent(user["id"]);
        var courses = JSON.parse(coursesObj.responseText);

        var attendanceInfo = [];

        for(var i=0; i<courses.length; i++) {

            var courAttListObj = getCourseAttForStudent(user["id"], courses[i]["id"]);
            var courAttList = JSON.parse(courAttListObj.responseText);

            var totalNumberOfAttendanceObj = getNumberOfAttendance(courses[i]["id"], courses[i]["sectionId"]);
            var totalNumberOfAttendance = JSON.parse(totalNumberOfAttendanceObj.responseText);

            var letters = '0123456789ABCDEF';
            var color = "#";
            for (var j = 0; j < 6; j++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            attendanceInfo.push({ "label":(courses[i]["id"]).toString(),
                "value":courAttList.length/totalNumberOfAttendance[0]["attendanceNumber"],
                "color":color
            });

        }

        var pie = new d3pie("pieChartAttendance", {
            "footer": {
                "color": "#999999",
                "fontSize": 10,
                "font": "open sans",
                "location": "bottom-left"
            },
            "size": {
                "canvasWidth": 590,
                "pieOuterRadius": "65%"
            },
            "data": {
                "sortOrder": "value-desc",
                "content": attendanceInfo
            },
            "labels": {
                "outer": {
                    "pieDistance": 32
                },
                "inner": {
                    "hideWhenLessThanPercentage": 1
                },
                "mainLabel": {
                    "fontSize": 11
                },
                "percentage": {
                    "color": "#ffffff",
                    "decimalPlaces": 0
                },
                "value": {
                    "color": "#adadad",
                    "fontSize": 11
                },
                "lines": {
                    "enabled": true
                },
                "truncation": {
                    "enabled": true
                }
            },
            "effects": {
                "pullOutSegmentOnClick": {
                    "effect": "linear",
                    "speed": 400,
                    "size": 8
                }
            },
            "misc": {
                "gradient": {
                    "enabled": true,
                    "percentage": 100
                }
            }
        });
    //});


    //Heat Map!!

    //$('#heatMapCaller').one("click", function () {

        var courseInterestObj = getInterestsOfCourses(user["id"]);
        var courseInterest = JSON.parse(courseInterestObj.responseText);

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


        var seatCounter=0;

        for(var i = 0; i<courseInterest.length;i++)
        {

            for(var j=0; j<zz.length; j++) {
                if(courseInterest[i]["distance"]>=j*100 && courseInterest[i]["distance"]<(j+1)*100)
                {
                    var seat;
                    seat=Math.floor(courseInterest[i]["leftcoor"]/20);
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

        Plotly.newPlot('heatmapContainer', data);
    //});



    var labelType, useGradients, nativeTextSupport, animate;

    (function() {
        var ua = navigator.userAgent,
            iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
            typeOfCanvas = typeof HTMLCanvasElement,
            nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
            textSupport = nativeCanvasSupport
                && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
        //I'm setting this based on the fact that ExCanvas provides text support for IE
        //and that as of today iPhone/iPad current text support is lame
        labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
        nativeTextSupport = labelType == 'Native';
        useGradients = nativeCanvasSupport;
        animate = !(iStuff || !nativeCanvasSupport);
    })();

    var Log = {
        elem: false,
        write: function(text){
            if (!this.elem)
                this.elem = document.getElementById('log');
            this.elem.innerHTML = text;
            this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
        }
    };


    //function init(){
        // init data
        var json = [
            {
                "adjacencies": [
                    {
                        "nodeTo": "node1",
                        "nodeFrom": "node0",
                        "data": {
                            "$color": "#557EAA"
                        }
                    },
                    {
                        "nodeTo": "node2",
                        "nodeFrom": "node0",
                        "data": {
                            "$color": "#557EAA"
                        }
                    }
                ],
                "data": {
                    "$color": "#83548B",
                    "$type": "star",
                    "$dim": 40
                },
                "id": "node0",
                "name": "ComputerScience"
            },
            {
                "adjacencies": [
                    {
                        "nodeTo": "node0",
                        "nodeFrom": "node1",
                        "data": {
                            "$color": "#557EAA"
                        }
                    }
                ],
                "data": {
                    "$color": "#83548B",
                    "$type": "square",
                    "$dim": 10
                },
                "id": "node1",
                "name": "Artificial Intelligence"
            },
            {
                "adjacencies": [],
                "data": {
                    "$color": "#83548B",
                    "$type": "circle",
                    "$dim": 20
                },
                "id": "node2",
                "name": "Computer Graphics"
            },
            {
                "adjacencies": [
                    {
                        "nodeTo": "node1",
                        "nodeFrom": "node3",
                        "data": {
                            "$color": "#557EAA"
                        }
                    }
                ],
                "data": {
                    "$color": "#83548B",
                    "$type": "circle",
                    "$dim": 20
                },
                "id": "node3",
                "name": "Deep Learning"
            },
            {
                "adjacencies": [
                    {
                        "nodeTo": "node1",
                        "nodeFrom": "node4",
                        "data": {
                            "$color": "#557EAA"
                        }
                    }
                ],
                "data": {
                    "$color": "#83548B",
                    "$type": "circle",
                    "$dim": 20
                },
                "id": "node4",
                "name": "Data Mining"
            }
        ];
        // end
        // init ForceDirected
        var fd = new $jit.ForceDirected({
            //id of the visualization container
            injectInto: 'infovis',
            //Enable zooming and panning
            //by scrolling and DnD
            Navigation: {
                enable: true,
                //Enable panning events only if we're dragging the empty
                //canvas (and not a node).
                panning: 'avoid nodes',
                zooming: 10 //zoom speed. higher is more sensible
            },
            // Change node and edge styles such as
            // color and width.
            // These properties are also set per node
            // with dollar prefixed data-properties in the
            // JSON structure.
            Node: {
                overridable: true
            },
            Edge: {
                overridable: true,
                color: '#23A4FF',
                lineWidth: 2.5
            },
            //Native canvas text styling
            Label: {
                type: labelType, //Native or HTML
                size: 10,
                style: 'bold'
            },
            //Add Tips
            Tips: {
                enable: true,
                onShow: function(tip, node) {
                    //count connections
                    var count = 0;
                    node.eachAdjacency(function() { count++; });
                    //display node info in tooltip
                    tip.innerHTML = "<div class=\"tip-title\">" + node.name + "</div>"
                        + "<div class=\"tip-text\"><b>connections:</b> " + count + "</div>";
                }
            },
            // Add node events
            Events: {
                enable: true,
                type: 'Native',
                //Change cursor style when hovering a node
                onMouseEnter: function() {
                    fd.canvas.getElement().style.cursor = 'move';
                },
                onMouseLeave: function() {
                    fd.canvas.getElement().style.cursor = '';
                },
                //Update node positions when dragged
                onDragMove: function(node, eventInfo, e) {
                    var pos = eventInfo.getPos();
                    node.pos.setc(pos.x, pos.y);
                    fd.plot();
                },
                //Implement the same handler for touchscreens
                onTouchMove: function(node, eventInfo, e) {
                    $jit.util.event.stop(e); //stop default touchmove event
                    this.onDragMove(node, eventInfo, e);
                },
                //Add also a click handler to nodes
                onClick: function(node) {
                    if(!node) return;
                    // Build the right column relations list.
                    // This is done by traversing the clicked node connections.
                    var html = "<h4>" + node.name + "</h4><b> connections:</b><ul><li>",
                        list = [];
                    node.eachAdjacency(function(adj){
                        list.push(adj.nodeTo.name);
                    });
                    //append connections information
                    $jit.id('inner-details').innerHTML = html + list.join("</li><li>") + "</li></ul>";
                }
            },
            //Number of iterations for the FD algorithm
            iterations: 200,
            //Edge length
            levelDistance: 130,
            // Add text to the labels. This method is only triggered
            // on label creation and only for DOM labels (not native canvas ones).
            onCreateLabel: function(domElement, node){
                domElement.innerHTML = node.name;
                var style = domElement.style;
                style.fontSize = "0.8em";
                style.color = "#ddd";
            },
            // Change node styles when DOM labels are placed
            // or moved.
            onPlaceLabel: function(domElement, node){
                var style = domElement.style;
                var left = parseInt(style.left);
                var top = parseInt(style.top);
                var w = domElement.offsetWidth;
                style.left = (left - w / 2) + 'px';
                style.top = (top + 10) + 'px';
                style.display = '';
            }
        });
        // load JSON data.
        fd.loadJSON(json);
        // compute positions incrementally and animate.
        fd.computeIncremental({
            iter: 40,
            property: 'end',
            onStep: function(perc){
                Log.write(perc + '% loaded...');
            },
            onComplete: function(){
                Log.write('done');
                fd.animate({
                    modes: ['linear'],
                    transition: $jit.Trans.Elastic.easeOut,
                    duration: 2500
                });
            }
        });
        // end
    //}



});
