$(document).ready(function(){

    loadNavBar();
    console.log("HELOO");

});
function main(){
    loadNavBar();
}

function notification(id) {
    var notificationList = JSON.parse(window.localStorage.getItem("notificationList")); // Retrieving
    var notification=notificationList[id];// After parsing row, now we have row index for userlist
    window.localStorage.setItem("notification", JSON.stringify(notification)); // Saving
    window.localStorage.setItem("backLink", JSON.stringify(window.location.href)); // Saving
    window.location.replace("http://localhost:8080/templates/notification/notification.html"); //That redirects to update page

}


function loadNavBar() {


    var navBarHTML=
        "                    <ul class=\"nav navbar-nav\">\n"+
        "                        <!-- Messages: style can be found in dropdown.less-->\n"+
        "                        <li class=\"dropdown messages-menu\">\n"+
        "                            <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n"+
        "                                <i class=\"fa fa-envelope-o\"></i>\n"+
        "                                <span id=\"messageCount\" class=\"label label-success\">0</span>\n"+
        "                            </a>\n"+
        "                            <ul class=\"dropdown-menu\">\n"+
        "                                <li id=\"messageHeader\" class=\"header\"></li>\n"+
        "                                <li>\n"+
        "                                    <!-- inner menu: contains the actual data -->\n"+
        "                                    <ul id=\"messageList\" class=\"menu\">\n"+
        "\n"+
        "                                    </ul>\n"+
        "                                </li>\n"+
        "                                <li class=\"footer\"><a href=\"#\">See All Messages</a></li>\n"+
        "                            </ul>\n"+
        "                        </li>\n"+
        "                        <!-- Notifications: style can be found in dropdown.less -->\n"+
        "                        <li class=\"dropdown notifications-menu\">\n"+
        "                            <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n"+
        "                                <i class=\"fa fa-bell-o\"></i>\n"+
        "                                <span id=\"notificationCount\" class=\"label label-warning\">0</span>\n"+
        "                            </a>\n"+
        "                            <ul class=\"dropdown-menu\">\n"+
        "                                <li id=\"notificationHeader\" class=\"header\"></li>\n"+
        "                                <li>\n"+
        "                                    <!-- inner menu: contains the actual data -->\n"+
        "                                    <ul id=\"notificationList\" class=\"menu\">\n"+
        "\n"+
        "                                    </ul>\n"+
        "                                </li>\n"+
        "                                <li class=\"footer\"><a href=\"#\">View all</a></li>\n"+
        "                            </ul>\n"+
        "                        </li>\n"+
        "                        <!-- Tasks: style can be found in dropdown.less -->\n"+
        "                        <li class=\"dropdown tasks-menu\">\n"+
        "                            <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n"+
        "                                <i class=\"fa fa-flag-o\"></i>\n"+
        "                                <span id=\"warningCount\" class=\"label label-danger\">0</span>\n"+
        "                            </a>\n"+
        "                            <ul class=\"dropdown-menu\">\n"+
        "                                <li id=\"warningHeader\" class=\"header\"></li>\n"+
        "                                <li>\n"+
        "                                    <!-- inner menu: contains the actual data -->\n"+
        "                                    <ul id=\"warningList\" class=\"menu\">\n"+
        "\n"+
        "                                    </ul>\n"+
        "                                </li>\n"+
        "                                <li class=\"footer\">\n"+
        "                                    <a href=\"#\">View all tasks</a>\n"+
        "                                </li>\n"+
        "                            </ul>\n"+
        "                        </li>\n"+
        "                        <!-- User Account: style can be found in dropdown.less -->\n"+
        "                        <li class=\"dropdown user user-menu\">\n"+
        "                            <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n"+
        "                                <img src=\"\" class=\"user-image\" alt=\"User Image\" id=\"studentImage2\">\n"+
        "                                <span class=\"hidden-xs\" id=\"studentButtonName\"></span>\n"+
        "                            </a>\n"+
        "                            <ul class=\"dropdown-menu\">\n"+
        "                                <!-- User image -->\n"+
        "                                <li class=\"user-header\">\n"+
        "                                    <img src=\"\" class=\"img-circle\" alt=\"User Image\" id=\"studentImage3\">\n"+
        "\n"+
        "                                    <p id=\"stuName\">\n"+
        "                                    </p>\n"+
        "                                </li>\n"+
        "                                <!-- Menu Body -->\n"+
        "                                <li class=\"user-body\">\n"+
        "                                    <div class=\"row\">\n"+
        "                                        <div class=\"col-xs-4 text-center\">\n"+
        "                                            <a href=\"#\">Followers</a>\n"+
        "                                        </div>\n"+
        "                                        <div class=\"col-xs-4 text-center\">\n"+
        "                                            <a href=\"#\">Sales</a>\n"+
        "                                        </div>\n"+
        "                                        <div class=\"col-xs-4 text-center\">\n"+
        "                                            <a href=\"#\">Friends</a>\n"+
        "                                        </div>\n"+
        "                                    </div>\n"+
        "                                    <!-- /.row -->\n"+
        "                                </li>\n"+
        "                                <!-- Menu Footer-->\n"+
        "                                <li class=\"user-footer\">\n"+
        "                                    <div class=\"pull-left\">\n"+
        "                                        <a href=\"#\" class=\"btn btn-default btn-flat\">Profile</a>\n"+
        "                                    </div>\n"+
        "                                    <div class=\"pull-right\">\n"+
        "                                        <a href=\"#\" class=\"btn btn-default btn-flat\">Sign out</a>\n"+
        "                                    </div>\n"+
        "                                </li>\n"+
        "                            </ul>\n"+
        "                        </li>\n"+
        "                        <!-- Control Sidebar Toggle Button -->\n"+
        "                        <li>\n"+
        "                            <a href=\"#\" data-toggle=\"control-sidebar\"><i class=\"fa fa-gears\"></i></a>\n"+
        "                        </li>\n"+
        "                    </ul>\n"+
        "                ";

    document.getElementById('navBar').innerHTML =navBarHTML;

}