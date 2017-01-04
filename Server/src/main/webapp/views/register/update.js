$(document).ready(function(){
    var user;
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
