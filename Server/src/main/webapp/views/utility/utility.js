function getUserFromDate(sectionId, course, date) { //This function get all students' names that attend a lecture.
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/attendance/getAttendanceFromDate/" + course + "/" + sectionId + "/" + date,
        async: false // This option prevents this function to execute asynchronized
    });
}

function getSectionCapacity(sectionId, course) { //This function gets capacity of a section of a course
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/rest/course/getSectionCapacity/" + course + "/" + sectionId,
        async: false // This option prevents this function to execute asynchronized
    });
}

function createUserTable(data,captionArr){  //This is a table creator function which is created for tables that have updatable rows.
    var htmlString = '<table class="table table-bordered table-striped"><thead><tr>'; //if you want to change the style of table, you can do this from here. See "border="1"

    for(var i=0;i<captionArr.length;i++){ //All the captions of columns are added to the table from the captionArr
        htmlString += "<th>"+captionArr[i]+"</th>";
    }

    htmlString += "<tfoot></tfoot>";

    htmlString += "<tbody>";
    for(var i=0;i<data.length;i++){// Rows are added to the table
        htmlString += "<tr>";
        for(var val in data[i]){
            if(val!=="ppic"){
                htmlString += "<td>";
                htmlString += data[i][val]; // Columns are added to the table
                htmlString += "</td>"
            }

        }
        // This is for adding update button to all the rows.
        htmlString += '<td><input class="btn btn-info" id="update'+i+'" type="button" value="Update"/></td>';
        // Adding delete button to all the rows.
        htmlString += '<td><input class="btn btn-danger" id="delete'+i+'" type="button" value="Delete"/></td></tr>';

    }
    htmlString +="</tbody>";

    htmlString += "</tr></thead>";
    return htmlString += "</table>"; // HTML table string is returned
}

function createCourseTable(data,captionArr,id){  //This is a table creator function which is created for tables that have updatable rows.
    var htmlString = '<table class="table table-bordered table-striped"><thead><tr>'; //if you want to change the style of table, you can do this from here. See "border="1"

    for(var i=0;i<captionArr.length;i++){ //All the captions of columns are added to the table from the captionArr
        htmlString += "<th>"+captionArr[i]+"</th>";
    }

    htmlString += "<tfoot></tfoot>";

    htmlString += "<tbody>";
    for(var i=0;i<data.length;i++){// Rows are added to the table
        htmlString += "<tr>";
        for(var val in data[i]){
            if(val === "id" || val === "name" || val === "sectionId") {
                htmlString += "<td>";
                htmlString += data[i][val]; // Columns are added to the table
                htmlString += "</td>"
            }
        }

        if(id == 2) {
            /*htmlString += '<td><input class="courseAttendance" id="courseAtt'+i+'" type="button" value="Get Attendance"/></td>';
            htmlString += '<td><input class="courseGrades" id="courseGrad'+i+'" type="button" value="Get Grades"/></td></tr>';*/
        }
        else if(id == 1) {
            /*htmlString += '<td><input class="firstLesson" id="firstLesson'+i+'" type="button" value="First Lesson Training"/></td>';
            htmlString += '<td><input class="takeAttendance" id="takeAttendance'+i+'" type="button" value="Take Attendance"/></td>';*/
        }
        else {
            htmlString += '<td><input class="courseReport" id="courseReport'+i+'" type="button" value="Get Report"/></td>';
        }
    }
    htmlString +="</tbody>";

    htmlString += "</tr></thead>";
    return htmlString += "</table>"; // HTML table string is returned
}

function createAttendanceTable(data,captionArr,secondTableData, secondTableCaptions){  //This is a table creator function which is created for tables that have updatable rows.
    var htmlString = '<table class="table table-bordered table-striped" id="attendance-table"><thead><tr>'; //if you want to change the style of table, you can do this from here. See "border="1"
    for(var i=0;i<captionArr.length;i++){ //All the captions of columns are added to the table from the captionArr
        htmlString += "<th>"+captionArr[i]+"</th>";
    }

    htmlString += "<tfoot></tfoot>";

    htmlString += "<tbody>";
    for(var i=0;i<data.length;i++){// Rows are added to the table
        htmlString += "<tr>";
        for(var val in data[i]) {
            if (val === "courseId") {
                htmlString += "<td>";
                htmlString += data[i][val]; // Columns are added to the table
                htmlString += "</td>"
            }
            else if (val === "date") {
                    var newDate = {year : 0, month : 0, day : 0, hour : 0, min : 0};
                    splitDate(data[i][val], newDate);
                    var date = newDate.day + "/" + newDate.month + "/" + newDate.year + " " + newDate.hour + ":" + newDate.min;
                    htmlString += "<td>";
                    htmlString += date; // Columns are added to the table
                    htmlString += "</td>"
            }
        }

        if(document.URL === "http://localhost:8080/templates/attendance/attendance.html") {
            htmlString += '<td><input class="getAttendanceInfo btn btn-default" id="getAttendanceInfo' + i + '" type="button" value="Get Attendance Info"/></td></tr>';
        }
    }

    for(var i=0;i<secondTableCaptions.length;i++){ //All the captions of columns are added to the table from the captionArr
        htmlString += "<th>"+secondTableCaptions[i]+"</th>";
    }

    /*if(document.URL === "http://localhost:8080/templates/attendance/attendance.html") {
        htmlString += '<td><input class="getAverageInterestInfo btn btn-default" id="getAverageInterestInfo' + '" type="button" value="Get Average Interest Info"/></td></tr>';
    }*/

    htmlString += "<tr>";
    htmlString += "<td>";
    htmlString += data.length.toString(); // Columns are added to the table
    htmlString += "</td>"


    htmlString += "<td>";
    htmlString += secondTableData[0]["attendanceNumber"]; // Columns are added to the table
    htmlString += "</td>"



    htmlString +="</tbody>";
    htmlString += "</tr></thead>";
    htmlString += "</table>";

    if(document.URL === "http://localhost:8080/templates/home/student-home.html") {
        htmlString += '<td><input class="closeAttendanceTable" onclick="deleteTable(\'' + '#Attendances' + '\')" type="button" id="closeAttendanceTable" value="Close"/></td>';
    }

    return htmlString; // HTML table string is returned
}

function deleteTable(tableName) {  //This is a table delete function which is created for tables.
    $(tableName).html("");
}

function createDateTable(data,captionArr){  //This is a table creator function which is created for tables that have updatable rows.
    var htmlString = '<table class="table table-bordered table-striped"><thead><tr>'; //if you want to change the style of table, you can do this from here. See "border="1"
    for(var i=0;i<captionArr.length;i++){ //All the captions of columns are added to the table from the captionArr
        htmlString += "<th>"+captionArr[i]+"</th>";
    }

    htmlString += "<tfoot></tfoot>";

    htmlString += "<tbody>";
    var courseCookie = JSON.parse(readCookie('course'));
    var capac = (getSectionCapacity(courseCookie["sectionId"], courseCookie["id"])).responseText;

    for(var i=0;i<data.length;i++){// Rows are added to the table
        htmlString += "<tr>";
        for(var val in data[i]) {
            if(val === "date") {

                var newDate = {year : 0, month : 0, day : 0, hour : 0, min : 0};
                splitDate(data[i][val], newDate);
                var date = newDate.day + "/" + newDate.month + "/" + newDate.year + " " + newDate.hour + ":" + newDate.min;
                htmlString += "<td>";
                htmlString += date; // Columns are added to the table
                htmlString += "</td>"
                htmlString += "<td>";


                var x = getUserFromDate(courseCookie["sectionId"], courseCookie["id"], data[i][val]);
                var StudentAttList=JSON.parse(x.responseText);

                var percentage =  Object.keys(StudentAttList).length * 100 / capac; // Columns are added to the table
                htmlString += '<div class="progress">';
                htmlString += '<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="50"';
                htmlString += 'aria-valuemin="0" aria-valuemax="100" style="width:';
                htmlString += percentage;
                htmlString += '%">';
                htmlString += percentage;
                htmlString += '%';
                htmlString += "</div> </div>";
                htmlString += "</td>"

            }
        }
        htmlString += '<td><input class="getStudents btn btn-default" id="getStudents'+i+'" type="button" value="Get Student List"/></td>';
        htmlString += '<td><input class="deleteAttendance btn btn-default" id="deleteAttendance'+i+'" type="button" value="Delete Attendance"/></td></tr>';




    }
    htmlString +="</tbody>";

    htmlString += "</tr></thead>";
    htmlString += "</table>";
    return htmlString // HTML table string is returned
}

function createGradeTable(data,captionArr, id){  //This is a table creator function which is created for tables that have updatable rows.
    var htmlString = '<table class="table table-bordered table-striped"><thead><tr>'; //if you want to change the style of table, you can do this from here. See "border="1"
    for(var i=0;i<captionArr.length;i++){ //All the captions of columns are added to the table from the captionArr
        htmlString += "<th>"+captionArr[i]+"</th>";
    }

    htmlString += "<tfoot></tfoot>";

    htmlString += "<tbody>";
    for(var i=0;i<data.length;i++){// Rows are added to the table
        htmlString += "<tr>";
        for(var val in data[i]) {
            if(val != "examId") {
                htmlString += "<td>";
                htmlString += data[i][val]; // Columns are added to the table
                htmlString += "</td>"
            }
        }
        if(id==1) {
            htmlString += '<td><input class="getGradeList btn btn-default" id="getGradeList'+i+'" type="button" value="Get Grade List"/></td>';
            htmlString += '<td><input class="ExcelExam btn btn-default" id="ExcelExam'+i+'" type="button" value="Upload Excel File"/></td>';
            htmlString += '<td><input class="deleteExam btn btn-default" id="deleteExam'+i+'" type="button" value="Delete Exam"/></td></tr>';
        }
    }
    htmlString +="</tbody>";
    htmlString += "</tr></thead>";
    htmlString += "</table>";

    if(document.URL === "http://localhost:8080/templates/home/student-home.html") {
        htmlString += '<td><input class="closeGradeTable" onclick="deleteTable(\'' + '#Grades' + '\')" type="button" id="closeGradeTable" value="Close"/></td>';
    }

    return htmlString; // HTML table string is returned
}

function createExamTable(data,captionArr){  //This is a table creator function which is created for tables that have updatable rows.
    var htmlString = '<table class="table table-bordered table-striped"><thead><tr>'; //if you want to change the style of table, you can do this from here. See "border="1"
    for(var i=0;i<captionArr.length;i++){ //All the captions of columns are added to the table from the captionArr
        htmlString += "<th>"+captionArr[i]+"</th>";
    }

    htmlString += "<tfoot></tfoot>";

    htmlString += "<tbody>";
    for(var i=0;i<data.length;i++){// Rows are added to the table
        htmlString += "<tr>";
        for(var val in data[i]) {

            htmlString += "<td>";
            htmlString += data[i][val]; // Columns are added to the table
            htmlString += "</td>"

        }
        htmlString += '<td><input class="updateGrade btn btn-default" id="updateGrade'+i+'" type="button" value="Update"/></td>';
        htmlString += '<td><input class="deleteGrade btn btn-default" id="deleteGrade'+i+'" type="button" value="Delete"/></td></tr>';
    }
    htmlString +="</tbody>";

    htmlString += "</tr></thead>";
    return htmlString += "</table>"; // HTML table string is returned
}

function createStudentTable(data,captionArr,flag){  //This is a table creator function which is created for tables that have updatable rows.
    var htmlString = '<table id="studentTable" class="table table-bordered table-striped"><thead><tr>'; //if you want to change the style of table, you can do this from here. See "border="1"
    for(var i=0;i<captionArr.length;i++){ //All the captions of columns are added to the table from the captionArr
        htmlString += "<th>"+captionArr[i]+"</th>";
    }

    htmlString += "<tfoot></tfoot>";

    htmlString += "<tbody>";
    for(var i=0;i<data.length;i++){// Rows are added to the table
        htmlString += "<tr>";
        for(var val in data[i]) {
            if(flag === 0 && val === "id") {
                htmlString += "<td><div id='cursorOnId' onmouseleave='profilePictureLeave()' onmouseover='profilePicturePopUp()'>";
                htmlString += data[i][val]; // Columns are added to the table
                htmlString += "</div></td>"
            }
            else {
                htmlString += "<td>";
                htmlString += data[i][val]; // Columns are added to the table
                htmlString += "</td>"
            }
        }
        if(flag === 0) {
            htmlString += '<td><select class="form-group" id="rowSelect'+i+'">';
            htmlString += '<option value="1">Front Rows</option>';
            htmlString += '<option value="2">Middle Rows</option>';
            htmlString += '<option value="3">Back Rows</option>';
            htmlString += '</select></td>';
        }
        if(flag === 1) {
            htmlString += '<td><input class="deleteAttendance btn btn-default" id="deleteAttendance'+i+'" type="button" value="Delete"/></td>';
        }
    }
    htmlString +="</tbody>";

    htmlString += "</tr></thead>";
    return htmlString += "</table>"; // HTML table string is returned
}

function createCookie(name,value,days) { // This function is implemented to create cookies
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000)); // how many days that this cookie can resist without expired
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/"; //Cookie name and value are also added here
}

function readCookie(name) {  // This function is implemented to read cookies
    var nameEQ = name + "=";
    var ca = document.cookie.split(';'); // We split the cookies and take them into an array called "ca"
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length); //Cookie that we want is found so it must be returned
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1); // Simply make the expire time -1 so automatically deleted.
}

function goToCourseHome(courseId, courseName, sectionId) {
    var course = {id:courseId, name:courseName, sectionId:sectionId};
    createCookie('course',JSON.stringify(course),1);
    window.location.replace("http://localhost:8080/templates/course/course-home.html"); //That redirects to course page
}

function goToStudentCourseHome(courseId, courseName, sectionId) {
    var course = {id:courseId, name:courseName, sectionId:sectionId};
    createCookie('course',JSON.stringify(course),1);
    window.location.replace("http://localhost:8080/templates/course/student-course-home.html"); //That redirects to course page
}

function profilePicturePopUp() {
    //todo: make profile picture pop up
    console.log("mouse over");
}

function profilePictureLeave() {
    //todo: redo popup
    console.log("mouse leave");
}

function splitDate(tempdate, newDate) {

    var year = Number(tempdate.substring(0, 4));

    var month = Number(tempdate.substring(4,6));

    var day = Number(tempdate.substring(6,8));

    var hour = Number(tempdate.substring(10,12));
    var min = Number(tempdate.substring(13,15));

    if(0<= hour && hour <= 9) {
        hour = "0" + hour;
    }

    if(0<= min && min <= 9) {
        min = "0" + min;
    }


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

    newDate.year = year;
    newDate.month = month;
    newDate.day = day;
    newDate.hour = hour;
    newDate.min = min;
}

function createDateReportTable(data,captionArr){  //This is a table creator function which is created for tables that have updatable rows.
    var htmlString = '<table class="table table-bordered table-striped"><thead><tr>'; //if you want to change the style of table, you can do this from here. See "border="1"
    for(var i=0;i<captionArr.length;i++){ //All the captions of columns are added to the table from the captionArr
        htmlString += "<th>"+captionArr[i]+"</th>";
    }

    htmlString += "<tfoot></tfoot>";

    htmlString += "<tbody>";

    for(var i=0;i<data.length;i++){// Rows are added to the table
        htmlString += "<tr>";
        for(var val in data[i]) {
            htmlString += "<td>";
            htmlString += data[i][val]; // Columns are added to the table
            htmlString += "</td>";
        }
    }
    htmlString +="</tbody>";

    htmlString += "</tr></thead>";
    htmlString += "</table>";
    return htmlString // HTML table string is returned
}