
$(document).ready(function(){

    $.getScript("/views/utility/sha256.js", function(){});
    $.getScript("/views/utility/utility.js", function(){});


    $("#login-form").submit(function(event) {
        event.preventDefault();
        var id = $("#login-id").val();
        var pass =$("#login-pass").val();

        if(pass.length>7 && pass.length<21){
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/rest/user/login?ID="+id+"&password="+sha256_digest($("#login-pass").val()),
                success: function(response,status){

                    user=response[0];
                    role=user["role"];
                    createCookie("mainuser",JSON.stringify(user),1);

                    if(role===0){
                        window.location.href = "templates/home/admin-home.html";
                    }
                    else if(role===1){
                        window.location.href = "templates/home/lecturer-home.html";
                    }
                    else if(role===2){
                        window.location.href = "templates/home/student-home.html";
                    }


                },
                error: function(xhr) {

                    $("#error_lgn_msg").html("<b style='color:red'>Invalid Username or Password</b><br></br>");
                }
            });
        }
        else{

            $("#error_lgn_msg").html("<b style='color:red'>Password must be longer than 8 character</b><br></br>");
        }

    });
});