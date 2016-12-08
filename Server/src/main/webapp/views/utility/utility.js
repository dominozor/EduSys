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

function createCourseTable(data,captionArr){  //This is a table creator function which is created for tables that have updatable rows.
    var htmlString = '<table border="1"><thead><tr>'; //if you want to change the style of table, you can do this from here. See "border="1"

    for(var i=0;i<captionArr.length;i++){ //All the captions of columns are added to the table from the captionArr
        htmlString += "<th>"+captionArr[i]+"</th>";
    }

    htmlString += "<tfoot></tfoot>";

    htmlString += "<tbody>";
    for(var i=0;i<data.length;i++){// Rows are added to the table
        htmlString += "<tr>";
        for(var val in data[i]){
            htmlString += "<td>";
            htmlString += data[i][val]; // Columns are added to the table
            htmlString += "</td>"
        }

        htmlString += '<td><input class="courseInfo" id="course'+i+'" type="button" value="View Course"/></td></tr>';

    }
    htmlString +="</tbody>";

    htmlString += "</tr></thead>";
    return htmlString += "</table>"; // HTML table string is returned
}

function createAttendanceTable(data,captionArr){  //This is a table creator function which is created for tables that have updatable rows.
    var htmlString = '<table border="1"><thead><tr>'; //if you want to change the style of table, you can do this from here. See "border="1"

    for(var i=0;i<captionArr.length;i++){ //All the captions of columns are added to the table from the captionArr
        htmlString += "<th>"+captionArr[i]+"</th>";
    }

    htmlString += "<tfoot></tfoot>";

    htmlString += "<tbody>";
    for(var i=0;i<data.length;i++){// Rows are added to the table
        htmlString += "<tr>";
        for(var val in data[i]) {
            if(val === "courseId" || val === "date") {
                htmlString += "<td>";
                htmlString += data[i][val]; // Columns are added to the table
                htmlString += "</td>"
            }
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