$(document).ready(function(){

    $.getScript("/views/utility/sha256.js", function(){}); //sha256.js is imported

    $('#register-repass').keyup(function() { //This function is for comparing password and confirmed password
        var pass =$("#register-pass").val();
        var confpass =$("#register-repass").val();
        if(pass===confpass){
            $("#confirmedPassMsg").html("<b style='color:green'>Confirmed </b>");
            $("#error_lgn_msg").html("");
        }
        else{
            $("#confirmedPassMsg").html("<b style='color:red'>Doesn't match </b>");
            $("#error_lgn_msg").html("");
        }
    });
    $("#register-form").submit(function(event) { // All the information about user is got from the fields.
        event.preventDefault();
        var name = $("#register-name").val(); //Name of the user
        var surname = $("#register-surname").val(); //Surname of the user
        var email = $("#register-email").val(); //E-mail of the user
        var id = $("#register-id").val(); //Id of the user
        var pass =$("#register-pass").val(); //Password of the user
        var confpass =$("#register-repass").val(); //Confirmed password of the user
        var role =0; //Default user : admin

        if(document.getElementById("r-lecturer").checked==true){
            role=1;
        }
        else if(document.getElementById("r-student").checked==true){
            role=2;
        }

        if(pass!==confpass){$("#error_lgn_msg").html("<b style='color:red'>Passwords doesn't match</b>");} // If password doesn't match, doesn't let user send the request
        else if(pass.length>7 && pass.length<21){ // Password must be [8-20] characters

            $.ajax({
                type: "POST",
                url: "http://localhost:8080/rest/user/add?ID="+id+"&name="+name+"&surname="+surname+"&email="+email+"&password="+sha256_digest(pass)+"&ppicLink=link-to-pic&role="+role,
                success: function(response){

                    $("#error_rgs_msg").html("<b style='color:green'>Success...</b>");


                },
                error: function(xhr) {

                    $("#error_rgs_msg").html("<b style='color:red'>Fail...</b>");
                }
            });
        }
        else{

            $("#error_lgn_msg").html("<b style='color:red'>Password must be longer than 8 character</b>");
        }

    });

    $("#backToAdminPage").click(function(){
        window.location.replace("http://localhost:8080/templates/home/admin-home.html");
    });
});