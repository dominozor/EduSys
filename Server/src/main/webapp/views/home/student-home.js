$(document).ready(function() {

    var courseList, courseListObj;
    var attList, attListObj;
    var gradeList, gradeListObj;
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
        url: '/views/exam/exam.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    $.ajax({
        url: '/views/WS/websocket.js',
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

    //When get attendance button is clicked, this function is called and gets data and create the table for attendance.
    $('#getAttendance').click(function () {
        attListObj=getAllAttForStudent(user["id"]);
        attList=JSON.parse(attListObj.responseText);
        var captions=["Course Id", "Date"];
        $('#Attendances').html(createAttendanceTable(attList,captions));
    });

    //This gets the grades of a student and puts the data after creating table of it.
    $('#getGrades').click(function () {
        gradeListObj=getAllGradesOfStudent(user["id"]);
        gradeList=JSON.parse(gradeListObj.responseText);
        var captions=["Course Id", "Course Name", "Grade", "Type"];
        $('#Grades').html(createGradeTable(gradeList,captions))
    });

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

    $('#pieChartInterestCaller').click(function () {

        var avgInterestInfoObj = listAverageInterestInfo(user["id"]);
        var avgInterestInfo = JSON.parse(avgInterestInfoObj.responseText);
        var mainInterestInfo = [];
        var interestInfo = [];
        for (var i = 0; i < avgInterestInfo.length; i++) {
            mainInterestInfo.push(avgInterestInfo[i]["distance"] + (avgInterestInfo[i]["bottomcoor"] - avgInterestInfo[i]["topcoor"]) +
                (avgInterestInfo[i]["rightcoor"] - avgInterestInfo[i]["leftcoor"]));
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
    });


    //Line Chart Of The Ratio Of Interests
    $('#lineChartInterestCaller').click(function () {

        $('#lineChartInterest').attr("style","height:505px");

        var graphInfo = [];
        var graphLegends = [];
        var courseIndices = {};
        graphLegends.push('Data');

        var coursesObj = listCoursesOfStudent(user["id"]);
        var courses = JSON.parse(coursesObj.responseText);
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
                graphData.push(0);

            graphInfo.push(graphData);
        }

        for(var i=0; i<courseInterest.length; i++) {
            graphInfo[i+1][courseIndices[courseInterest[i]["courseId"]]] = (courseInterest[i]["distance"] + (courseInterest[i]["bottomcoor"] - courseInterest[i]["topcoor"]) +
            (courseInterest[i]["rightcoor"] - courseInterest[i]["leftcoor"]));

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
            };

            var chart = new google.visualization.LineChart(document.getElementById('lineChartInterest'));
            chart.draw(data, options);
        }

    });



    //Pie Chart Of Ratio Of Attendances

    $('#pieChartAttendanceCaller').click(function () {

        var coursesObj = listCoursesOfStudent(user["id"]);
        var courses = JSON.parse(coursesObj.responseText);

        var attendanceInfo = [];

        for(var i=0; i<courses.length; i++) {

            var courAttListObj = getCourseAttForStudent(user["id"], courses[i]["id"]);
            var courAttList = JSON.parse(courAttListObj.responseText);

            var totalNumberOfAttendanceObj = getNumberOfAttendance(courses[i]["id"], courses[i]["sectionNo"]);
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
    });


    //Heat Map!!

    $('#heatMapCaller').click(function () {

        var data = [
            {
                z: [[6,8,9,5,7,2,5,10,3,6], [6,7,6,7,6,7,6,7,6,7], [5,6,5,6,5,6,5,6,5,6], [5,6,5,6,5,6,5,6,5,6], [4,5,4,5,4,5,4,5,4,5],
                    [4,5,4,5,4,5,4,5,4,5], [4,6,5,7,4,6,5,7,4,6], [3,6,4,7,3,6,4,7,3,6], [2,3,4,2,3,4,2,3,4,4], [2,3,4,2,3,4,2,3,4,5]],
                x: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                y: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                type: 'heatmap'
            }
        ];

        Plotly.newPlot('heatmapContainer', data);
    });

    
});
