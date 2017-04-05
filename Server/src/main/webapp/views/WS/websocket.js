/**
 * Created by enver on 3/29/17.
 */
var webSocket = new WebSocket("ws://localhost:8080/websocketendpoint");
//    var echoText = document.getElementById("echoText");
//    echoText.value = "";

webSocket.onopen = function(message){ wsOpen(message);};
webSocket.onmessage = function(message){ wsGetMessage(message);};
webSocket.onclose = function(message){ wsClose(message);};
webSocket.onerror = function(message){ wsError(message);};

this.waitForConnection = function (callback, interval) {
    if (webSocket.readyState === 1) {
        callback();
    } else {
        var that = this;
        // optional: implement backoff for interval here
        setTimeout(function () {
            this.waitForConnection(callback, interval);
        }, interval);
    }
};
function wsOpen(message){
//        echoText.value += "Connected ... \n";
}
function wsSendMessage(userid){
    this.waitForConnection(function () {
            webSocket.send(userid);}
        , 1000);


}
function wsCloseConnection(){
    webSocket.close();
}
function wsGetMessage(message){
    var result = JSON.parse(message.data);
    var resSize=result.length;
    var warningSize=0;
    var notSize=0;
    var messageSize=0;
    for(var i=0;i<resSize && i<5;i++){
        var newRow="";
        if(!result[i]["isviewed"]){
            newRow+='<li role="button" style="background:#b4cde4"><a onclick="notification('+i+')" class="notification" id="notification"+i ><i class="fa fa-users text-aqua" ></i>';
        }
        else{
            newRow+='<li role="button" ><a onclick="notification('+i+')" class="notification" id="notification"+i><i class="fa fa-users text-aqua"></i>';
        }
        newRow += result[i]["sender"]+' - '+result[i]["message"].split("\n")[0]+'</a></li>';

        if(result[i]["type"]==="1"){
            if(!result[i]["isviewed"])
                messageSize++;
            $("#messageList").append(newRow);
        }
        else if(result[i]["type"]==="2"){
            if(!result[i]["isviewed"])
                notSize++;
            $("#notificationList").append(newRow);
        }
        else if(result[i]["type"]==="3"){
            if(!result[i]["isviewed"])
                warningSize++;
            $("#warningList").append(newRow);
        }

    }
    document.getElementById("messageCount").innerHTML = messageSize.toString();
    document.getElementById("notificationCount").innerHTML = notSize.toString();
    document.getElementById("warningCount").innerHTML = warningSize.toString();

    document.getElementById("messageHeader").innerHTML = 'You have '+messageSize.toString()+' new messages';
    document.getElementById("notificationHeader").innerHTML = 'You have '+notSize.toString()+' notifications';
    document.getElementById("warningHeader").innerHTML = 'You have '+warningSize.toString()+' warnings';

    window.localStorage.setItem("notificationList", JSON.stringify(result)); // Saving



//        echoText.value += "Message received from to the server : " + message.data + "\n";
}
function wsClose(message){
//        echoText.value += "Disconnect ... \n";
}

function wserror(message){
    echoText.value += "Error ... \n";
}
