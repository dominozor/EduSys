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

    user = JSON.parse(readCookie('mainuser'));
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

    $('.courseInfo').click(function () {
        var row=parseInt($(this)[0].id.substr(6)); //Row ids are course#(number) so first 6 characters("course") is not important.
        var course=courseList[row];// After parsing row, now we have row index for courselist.
        createCookie('course',JSON.stringify(course),1); // A cookie is created for the course page.Cookie has the information about course and keeps it as a JSON.
        window.location.replace("http://localhost:8080/templates/course/course.html"); //That redirects to course page
    });


    $('.courseAttendance').click(function () {
        var row=parseInt($(this)[0].id.substr(9)); //Row ids are courseAtt#(number) so first 6 characters("course") is not important.
        var course=courseList[row];// After parsing row, now we have row index for courselist.
        createCookie('courseAtt',JSON.stringify(course),1); // A cookie is created for the course page.Cookie has the information about course and keeps it as a JSON.
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

    var avgInterestInfoObj=listAverageInterestInfo(user["id"]);
    var avgInterestInfo=JSON.parse(avgInterestInfoObj.responseText);
    var mainInterestInfo = [];
    var interestInfo = [];
    for(var i=0; i<avgInterestInfo.length; i++) {
        mainInterestInfo.push(avgInterestInfo[i]["distance"] + (avgInterestInfo[i]["bottomcoor"] - avgInterestInfo[i]["topcoor"]) +
            (avgInterestInfo[i]["rightcoor"] - avgInterestInfo[i]["leftcoor"]));
        var letters = '0123456789ABCDEF';
        var color = "#";
        for (var j = 0; j < 6; j++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        interestInfo.push({ "label":(avgInterestInfo[i]["courseId"]).toString(),
            "value":mainInterestInfo[i],
            "color":color
        });
    }

    /*$(".sparkline").sparkline(mainInterestInfo, {
     type: 'pie',
     width: '150px',
     height: '150px',
     tooltipFormat: '{{offset:slice}} ({{percent.1}}%)',
     tooltipValueLookups: {
     'slice':interestInfo
     },
     });*/

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


    //Line Chart Of The Ratio Of Interests

    /*FusionCharts.ready(function(){
        var fusioncharts = new FusionCharts({
                type: 'zoomline',
                renderAt: 'chart-container',
                width: '600',
                height: '400',
                dataFormat: 'json',
                dataSource: {
                    "chart": {
                        "caption": "Interest Ratio",
                        "subcaption": "Current year",
                        "yaxisname": "Interest Point",
                        "xaxisname": "Date",
                        "yaxisminValue": "0",
                        "yaxismaxValue": "100",
                        "pixelsPerPoint": "0",
                        "pixelsPerLabel": "30",
                        "lineThickness": "1",
                        "compactdatamode": "1",
                        "dataseparator": "|",
                        "labelHeight": "30",
                        "theme": "fint"
                    },
                    "categories": [{
                        "category": "Jan 01"
                    }],
                    "dataset": [{
                        "seriesname": "harrysfoodmart.com",
                        "data": "97,8"
                    }, {
                        "seriesname": "harrysfashion.com",
                        "data": "10,53"
                    }, {
                        "seriesname": "aliexpress.com",
                        "data":"50"
                    }]
                }
            }
        );
        fusioncharts.render();
    });*/

    var courseInterestObj = listCoursesOfStudent(user["id"]);
    var courseInterest = JSON.parse(courseInterestObj.responseText);
    var graphInfo = []
    for(var i=0; i<courseInterest.length; i++) {
        var date = new Date(2017,i,11);
        graphInfo.push(date);
    }


    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Year', 'Sales', 'Expenses'],
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
        ]);

        var options = {
            hAxis: {title: 'Date',  titleTextStyle: {color: '#333'}},
            vAxis: {title: 'Interest Point', minValue: 0},
            pointSize: 7,
            explorer: {
                actions: ['dragToZoom', 'rightClickToReset'],
                axis: 'horizontal',
                keepInBounds: true,
                maxZoomIn: 32.0},
            colors: ['#D44E41', '#000000'],
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }



    //Pie Chart Of Ratio Of Attendances

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

        //window.alert(courAttList.length);
        //window.alert(totalNumberOfAttendance[0]["attendanceNumber"]);
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
