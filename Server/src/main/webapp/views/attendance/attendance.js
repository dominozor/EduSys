
function getAllAttForStudent(id) { //This function gets all attendance data of a student from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/attendance/getAllAttendance/" + id,
        async: false  // This option prevents this function to execute asynchronized
    });
}

function getCourseAttForStudent(id, course) { //This function gets a specific course attendance data of a student from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/attendance/getCourseAttendance/" +id+ "/" +course,
        async: false // This option prevents this function to execute asynchronized
    });
}

function listAllStudentsAtt(id, course) { //This function gets attendance data of all students for a specific course from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/attendance/getAllAttendance/" +course+ "/" +id,
        async: false // This option prevents this function to execute asynchronized
    });
}

function getNumberOfAttendance(course, sectionID) { //This function gets attendance data of all students for a specific course from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/attendance/getAttendanceNumber/" +course+ "/" +sectionID,
        async: false // This option prevents this function to execute asynchronized
    });
}

function listAverageInterestInfo(course) { //This function gets attendance data of all students for a specific course from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/attendance/listAvgInterests/" +course,
        async: false // This option prevents this function to execute asynchronized
    });
}

function listCoursesOfStudent(userID) { //This function gets attendance data of all students for a specific course from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/user/getStudentCourses/" +userID,
        async: false // This option prevents this function to execute asynchronized
    });
}

function getInterestsOfCourses(userID) { //This function gets attendance data of all students for a specific course from the Rest services of EduSys
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/attendance/getInterestInfo/" +userID,
        async: false // This option prevents this function to execute asynchronized
    });
}

function getNumofStudentsForSection(courseID,sectionID) {

    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/course/getNumofStudentsForSection/" + courseID + "/" + sectionID ,
        async: false // This option prevents this function to execute asynchronized
    });
}

$(document).ready(function(){
    var courAttList, courAttListObj, totalNumberOfAttendanceObj, totalNumberOfAttendance;
    var course, user;

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

    course  = JSON.parse(readCookie('course'));
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

    //This gets a course attendance data of a specific student and puts the data to the table to course-attendance div of the attendance.html  
    courAttListObj=getCourseAttForStudent(user["id"], course["id"]);
    courAttList=JSON.parse(courAttListObj.responseText);

    totalNumberOfAttendanceObj=getNumberOfAttendance(course["id"], course["sectionId"]);
    totalNumberOfAttendance=JSON.parse(totalNumberOfAttendanceObj.responseText);

    var captions=["Course Id", "Date"];
    var secondTableCaption=["Number Of Student Attendance", "Total Attendance Taken"]
    $('#course-attendance').html(createAttendanceTable(courAttList,captions,totalNumberOfAttendance, secondTableCaption));

    document.getElementById("attendanceRate").innerHTML = "<h3>" + "%" + parseInt((courAttList.length/totalNumberOfAttendance[0]["attendanceNumber"])*100, 10) + "</h3>" + "<p>Attendance Rate</p>";


    var numOfStudents = getNumofStudentsForSection(course["id"], course["sectionId"]).responseText;
    document.getElementById("numOfStudents").innerHTML = "<h3>" + numOfStudents + "</h3>" + "<p>Students</p>";

    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    var courseInterestObj = getInterestsOfCourses(user["id"]);
    var courseInterest = JSON.parse(courseInterestObj.responseText);

    var sectionInfoObj = getSection(course["id"], course["sectionId"]);
    var sectionInfo = JSON.parse(sectionInfoObj.responseText);

    var class_size = sectionInfo["class_size"];
    var numberOfRowStr = "";
    var numberOfSeatStr = "";
    var flag = 0;

    for(var i=0; i<class_size.length; i++) {
        if(flag == 0) {
            if(class_size[i] != "x") {
                numberOfRowStr += class_size[i];
            }
            else
                flag = 1;
        }
        else
            numberOfSeatStr += class_size[i];
    }

    var numberOfRow = Number(numberOfRowStr);
    var numberOfSeat = Number(numberOfSeatStr);

    var zz=[];

    for(var i=0; i<numberOfRow; i++) {
        var zzRow = [];
        for(var j=0; j<numberOfSeat; j++) {
            zzRow.push(0);
        }
        zz.push(zzRow);
    }

    // When the user clicks the button, open the modal
    $('.getAttendanceInfo').click(function() {
        var row = parseInt($(this)[0].id.substr(17));

        var zzTemp=[];

        for(var i=0; i<numberOfRow; i++) {
            var zzRow = [];
            for(var j=0; j<numberOfSeat; j++) {
                zzRow.push(0);
            }
            zzTemp.push(zzRow);
        }


        var seatCounter=0;

        for(var i = 0; i<courseInterest.length;i++)
        {
            if(courseInterest[i]["courseId"] == course["id"] && courseInterest[i]["sectionId"] == course["sectionId"] && courseInterest[i]["date"] == courAttList[row]["date"]) {
                console.log("girdi");
                for (var j = 0; j < zz.length; j++) {
                    if (courseInterest[i]["distance"] >= j * 100 && courseInterest[i]["distance"] < (j + 1) * 100) {
                        var seat;
                        seat = Math.floor(courseInterest[i]["leftcoor"] / 20);
                        zzTemp[j][seat] += 1;
                        seatCounter++;
                    }
                }
            }
        }


        for(var i=0;i<zzTemp.length;i++)
        {
            for(var j=0 ; j<zzTemp[i].length;j++)
            {
                zzTemp[i][j]=(zzTemp[i][j]/seatCounter)*100;
            }
        }


        var xx=[];
        var yy=[];

        var maxNum = Math.max(numberOfSeat, numberOfRow);

        for(var i =0 ;i< maxNum; i++)
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
                z : zzTemp,
                x: xList,
                y: yList,
                type: 'heatmap'
            }
        ];

        Plotly.newPlot('heatmapContainerPopUp', data);

        modal.style.display = "block";
    });

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    $('#goToHome').click(function () {
        window.location.replace("http://localhost:8080/templates/home/student-home.html");
    });

    $('#goToDates').click(function () {
        window.location.replace("http://localhost:8080/templates/attendance/attendance.html");
    });

    $('#goToExams').click(function () {
        window.location.replace("http://localhost:8080/templates/exam/exam.html");
    });


    $("#backStudentPage").click(function(){
        window.location.replace("http://localhost:8080/templates/home/student-home.html");
    });


    //Overall Heat Map
    var seatCounter=0;

    for(var i = 0; i<courseInterest.length;i++)
    {
        if(courseInterest[i]["courseId"] == course["id"] && courseInterest[i]["sectionId"] == course["sectionId"]) {
            for (var j = 0; j < zz.length; j++) {
                if (courseInterest[i]["distance"] >= j * 100 && courseInterest[i]["distance"] < (j + 1) * 100) {
                    var seat;
                    seat = Math.floor(courseInterest[i]["leftcoor"] / 20);
                    zz[j][seat] += 1;
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

    var maxNum = Math.max(numberOfSeat, numberOfRow);

    for(var i =0 ;i< maxNum; i++)
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

    Plotly.newPlot('heatmapContainer', data);

});
