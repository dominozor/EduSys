function createUserTable(data,captionArr){  //This is a table creator function which is created for tables that have updatable rows.
    var htmlString = '<table border="1"><thead><tr>'; //if you want to change the style of table, you can do this from here. See "border="1"

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
        htmlString += '<td><input class="update_button" id="update'+i+'" type="button" value="Update"/></td></tr>';
    }
    htmlString +="</tbody>";

    htmlString += "</tr></thead>";
    return htmlString += "</table>"; // HTML table string is returned
}

function createCourseTable(data,captionArr,id){  //This is a table creator function which is created for tables that have updatable rows.
    var htmlString = '<table border="1"><thead><tr>'; //if you want to change the style of table, you can do this from here. See "border="1"

    for(var i=0;i<captionArr.length;i++){ //All the captions of columns are added to the table from the captionArr
        htmlString += "<th>"+captionArr[i]+"</th>";
    }

    htmlString += "<tfoot></tfoot>";

    htmlString += "<tbody>";
    for(var i=0;i<data.length;i++){// Rows are added to the table
        htmlString += "<tr>";
        for(var val in data[i]){
            if(val === "id" || val === "name") {
                htmlString += "<td>";
                htmlString += data[i][val]; // Columns are added to the table
                htmlString += "</td>"
            }
        }

        htmlString += '<td><input class="courseInfo" id="course'+i+'" type="button" value="View Course"/></td>';
        if(id == 2) {
            htmlString += '<td><input class="courseAttendance" id="courseAtt'+i+'" type="button" value="Get Attendance"/></td>';
            htmlString += '<td><input class="courseGrades" id="courseGrad'+i+'" type="button" value="Get Grades"/></td></tr>';
        }
        else if(id == 1) htmlString += '<td><input class="courseDate" id="courseDate'+i+'" type="button" value="Get Dates"/></td></tr>';
    }
    htmlString +="</tbody>";

    htmlString += "</tr></thead>";
    return htmlString += "</table>"; // HTML table string is returned
}

function createAttendanceTable(data,captionArr){  //This is a table creator function which is created for tables that have updatable rows.
    var htmlString = '<table border="1" id="attendance-table"><thead><tr>'; //if you want to change the style of table, you can do this from here. See "border="1"

    for(var i=0;i<captionArr.length;i++){ //All the captions of columns are added to the table from the captionArr
        htmlString += "<th>"+captionArr[i]+"</th>";
    }

    htmlString += "<tfoot></tfoot>";

    htmlString += "<tbody>";
    for(var i=0;i<data.length;i++){// Rows are added to the table
        htmlString += "<tr>";
        for(var val in data[i]) {
            if (val === "courseId" || val === "date") {
                htmlString += "<td>";
                htmlString += data[i][val]; // Columns are added to the table
                htmlString += "</td>"
            }
        }
    }
    htmlString +="</tbody>";

    htmlString += "</tr></thead>";
    htmlString += "</table>";

    if(document.getElementById("student-home").innerHTML === "Student Page") {
        htmlString += '<td><input class="backStuPage" type="button" id="backStudentPage" value="Close"/></td>';
    }

    return htmlString; // HTML table string is returned
}

/*function deleteAttendanceTable(){  //This is a table delete function which is created for tables.
    window.alert("qwdqwdqw");
    var tables = document.getElementById("attendance-table");
    window.alert("asdasda");
    for (var i=tables.length-1; i>=0;i-=1)
        if (tables[i]) tables[i].parentNode.removeChild(tables[i]);
}*/

function createDateTable(data,captionArr){  //This is a table creator function which is created for tables that have updatable rows.
    var htmlString = '<table border="1"><thead><tr>'; //if you want to change the style of table, you can do this from here. See "border="1"
    for(var i=0;i<captionArr.length;i++){ //All the captions of columns are added to the table from the captionArr
        htmlString += "<th>"+captionArr[i]+"</th>";
    }

    htmlString += "<tfoot></tfoot>";

    htmlString += "<tbody>";
    for(var i=0;i<data.length;i++){// Rows are added to the table
        htmlString += "<tr>";
        for(var val in data[i]) {
            if(val === "date") {
                htmlString += "<td>";
                htmlString += data[i][val]; // Columns are added to the table
                htmlString += "</td>"
            }
        }
        htmlString += '<td><input class="getStudents" id="getStudents'+i+'" type="button" value="Get Student List"/></td></tr>';

    }
    htmlString +="</tbody>";

    htmlString += "</tr></thead>";
    return htmlString += "</table>"; // HTML table string is returned
}

function createGradeTable(data,captionArr){  //This is a table creator function which is created for tables that have updatable rows.
    var htmlString = '<table border="1"><thead><tr>'; //if you want to change the style of table, you can do this from here. See "border="1"
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
    }
    htmlString +="</tbody>";

    htmlString += "</tr></thead>";
    return htmlString += "</table>"; // HTML table string is returned
}

function createStudentTable(data,captionArr){  //This is a table creator function which is created for tables that have updatable rows.
    var htmlString = '<table border="1"><thead><tr>'; //if you want to change the style of table, you can do this from here. See "border="1"
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