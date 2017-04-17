$(document).ready(function(){

    $.getScript("/views/utility/sha256.js", function(){}); //sha256.js is imported

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
    $('#userIdHeader').html(user["id"]);

    $('#register-repass').keyup(function() { //This function is for comparing password and confirmed password
        var pass =$("#register-pass").val();
        var confpass =$("#register-repass").val();
        if(pass===confpass){
            $("#confirmedPassMsg").html("<b style='color:green'>Matched </b><br></br>");
            $("#error_lgn_msg").html("");
        }
        else{
            $("#confirmedPassMsg").html("<b style='color:red'>Passwords doesn't match </b><br></br>");
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

        if(pass.length>7 && pass.length<21){ // Password must be [8-20] characters

            $.ajax({
                type: "POST",
                url: "http://localhost:8080/rest/user/add?ID="+id+"&name="+name+"&surname="+surname+"&email="+email+"&password="+sha256_digest(pass)+"&ppicLink=link-to-pic&role="+role,
                success: function(response){

                    $("#error_rgs_msg").html("</br><b style='color:green'>Success!</b>");


                },
                error: function(xhr) {

                    $("#error_rgs_msg").html("</br><b style='color:red'>Fail!</b>");
                }
            });
        }
        else{

            $("#error_rgs_msg").html("</br><b style='color:red'>Password must be longer than 8 character</b>");
        }

    });

    $("#backToAdminPage").click(function(){
        window.location.replace("http://localhost:8080/templates/home/admin-home.html");
    });
});
