$(document).ready(function(){
    var user, mainuser;

    $.ajax({
        url: '/views/eduUser/eduUser.js',
        dataType: 'script',
        async: false  // This option prevents this function to execute asynchronized
    });

    $.ajax({ //While importing utility.py, other fields are filled with the information that is read from cookie if the result is success.
        url: '/views/utility/utility.js',
        dataType: 'script',
        async: false,
        success: function(response) {
            user = JSON.parse(readCookie('user'));
            $("#update-name").val(user["name"]);
            $("#update-surname").val(user["surname"]);
            $("#update-email").val(user["email"]);
            $("#update-id").val(user["id"]);
            var role =user["role"];
            if(role=="0"){
                document.getElementById("u-admin").checked=true;
            }
            else if (role=="1"){
                document.getElementById("u-lecturer").checked=true;
            }
            else if (role=="2"){
                document.getElementById("u-student").checked=true;
            }
        }
    });

    mainuser = JSON.parse(readCookie('mainuser'));
    var img = document.getElementById("studentImage"); //This puts the profile picture of the student to the home page.
    img.src = String(mainuser["ppic"]);

    $('#studentName').html(mainuser["name"] + " " + mainuser["surname"])
    $('#studentButtonName').html(mainuser["name"] + " " + mainuser["surname"])
    $('#stuName').html(mainuser["name"] + " " + mainuser["surname"])

    $("#update-form").submit(function(event) { // After clicking on "Update" button, all the information again is got from the fields to send request.
        event.preventDefault();
        var name = $("#update-name").val();
        var surname = $("#update-surname").val();
        var email = $("#update-email").val();
        var id = $("#update-id").val();
        var role = 0; //Default user : admin

        if(document.getElementById("u-lecturer").checked==true){
            role=1;
        }
        else if(document.getElementById("u-student").checked==true){
            role=2;
        }

        $.ajax({
                type: "PUT", //We use PUT for update
                url: "http://localhost:8080/rest/user/update?ID="+id+"&name="+name+"&surname="+surname+"&email="+email+"&role="+role,
                success: function(response){

                    $("#error_upt_msg").html("</br><b style='color:green'>Success!</b>");
                    eraseCookie("user"); // If success, we don't need this cookie.

                },
                error: function(xhr) {

                    $("#error_upt_msg").html("</br><b style='color:red'>Fail!</b>");
                }
            });

    });

    $("#backToAdminPage").click(function(){
        eraseCookie("user"); // If user wants to go back to the admin page, there is no need for this cookie
        window.location.replace("http://localhost:8080/templates/home/admin-home.html");
    });
});
