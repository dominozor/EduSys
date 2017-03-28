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


    window.onload = function () {


        // helper function
        function $(id) {
            return document.getElementById(id);
        };

        /*  legend code */
        // we want to display the gradient, so we have to draw it
        var legendCanvas = document.createElement('canvas');
        legendCanvas.width = 50;
        legendCanvas.height = 7;

        var legendCtx = legendCanvas.getContext('2d');
        var gradientCfg = {};

        function updateLegend(data) {
            // the onExtremaChange callback gives us min, max, and the gradientConfig
            // so we can update the legend
            $('min').innerHTML = data.min;
            $('max').innerHTML = data.max;
            // regenerate gradient image
            if (data.gradient != gradientCfg) {
                gradientCfg = data.gradient;
                var gradient = legendCtx.createLinearGradient(0, 0, 100, 1);
                for (var key in gradientCfg) {
                    gradient.addColorStop(key, gradientCfg[key]);
                }

                legendCtx.fillStyle = gradient;
                legendCtx.fillRect(0, 0, 100, 10);
                $('gradient').src = legendCanvas.toDataURL();
            }
        };
        /* legend code end */

        // create a heatmap instance
        var heatmap = h337.create({
            container: document.getElementById('heatmapContainer'),
            maxOpacity: .5,
            radius: 10,
            blur: .75,
            // update the legend whenever there's an extrema change
            onExtremaChange: function onExtremaChange(data) {
                updateLegend(data);
            }
        });
        // boundaries for data generation
        var width = (+window.getComputedStyle(document.body).width.replace(/px/,''));
        var height = (+window.getComputedStyle(document.body).height.replace(/px/,''));

        // generate 1000 datapoints
        var generate = function () {
            // randomly generate extremas
            var extremas = [(Math.random() * 1000) >> 0, (Math.random() * 1000) >> 0];
            var max = Math.max.apply(Math, extremas);
            var min = Math.min.apply(Math, extremas);
            var t = [];


            for (var i = 0; i < 1000; i++) {
                var x = (Math.random() * width) >> 0;
                var y = (Math.random() * height) >> 0;
                var c = ((Math.random() * max - min) >> 0) + min;
                // btw, we can set a radius on a point basis
                var r = (Math.random() * 80) >> 0;
                // add to dataset
                t.push({x: x, y: y, value: c, radius: r});
            }

            var init = +new Date;
            // set the generated dataset
            heatmap.setData({
                min: min,
                max: max,
                data: t
            });
            console.log('took ', (+new Date) - init, 'ms');
        };
        // initial generate
        generate();

        // whenever a user clicks on the ContainerWrapper the data will be regenerated -> new max & min
        document.getElementById('heatmapContainerWrapper').onclick = function () {
            generate();
        };

    };
});
