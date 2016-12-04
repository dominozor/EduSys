
$(document).ready(function(){

    $.getScript("/views/utility/sha256.js", function(){});


    $("#login-form").submit(function(event) {
        event.preventDefault();
        var id = $("#login-id").val();
        var pass =$("#login-pass").val();

        if(pass.length>7 && pass.length<21){
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/rest/user/login?ID="+id+"&password="+sha256_digest($("#login-pass").val()),
                success: function(response,status){

                    if(response==="0"){
                        console.log("Admin Page");
                        window.location.href = "templates/home/admin-home.html";
                    }
                    else if(response==="1"){
                        console.log("Lecturer Page");
                        window.location.href = "templates/home/lecturer-home.html";
                    }
                    else if(response==="2"){
                        console.log("Student Page");
                        window.location.href = "templates/home/student-home.html";
                    }


                },
                error: function(xhr) {

                    $("#error_lgn_msg").html("<b style='color:red'>Invalid username/password</b>");
                }
            });
        }
        else{

            $("#error_lgn_msg").html("<b style='color:red'>Password must be longer than 8 character</b>");
        }

    });
});