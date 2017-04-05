$(function(){
    $("#includedContent").load("main.html");
});
function notification(id) {
    console.log("hwhw");
    var notificationList = JSON.parse(window.localStorage.getItem("notificationList")); // Retrieving
    var notification=notificationList[id];// After parsing row, now we have row index for userlist
    window.localStorage.setItem("notification", JSON.stringify(notification)); // Saving
    window.localStorage.setItem("backLink", JSON.stringify(window.location.href)); // Saving
    window.location.replace("http://localhost:8080/templates/notification/notification.html"); //That redirects to update page

}