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
    console.log(result);
    console.log(resSize);
    var warningSize=0;
    var notSize=0;
    var messageSize=0;
    for(var i=0;i<resSize;i++){
        if(result[i]["type"]==="1"){
            messageSize++;
            $("#messageList").append('<li><a href="#"><i class="fa fa-users text-aqua"></i>'+
                result[i]["sender"]+' - '+result[i]["message"]+'</a></li>');
        }
        else if(result[i]["type"]==="2"){
            console.log(result[i]);
            notSize++;
            var ul = document.getElementById("notificationList");
            var li = document.createElement("li");
            li.innerHTML='<a href="#"><i class="fa fa-users text-aqua"></i>'+
                result[i]["sender"]+' - '+result[i]["message"]+'</a>';
            ul.appendChild(li);

        }
        else if(result[i]["type"]==="3"){
            warningSize++;
            $("#warningList").append('<li><a href="#"><i class="fa fa-users text-aqua"></i>'+
                result[i]["sender"]+' - '+result[i]["message"]+'</a></li>');
        }

    }
    document.getElementById("messageCount").innerHTML = messageSize.toString();
    document.getElementById("notificationCount").innerHTML = notSize.toString();
    document.getElementById("warningCount").innerHTML = warningSize.toString();

    document.getElementById("messageHeader").innerHTML = 'You have '+messageSize.toString()+' new messages';
    document.getElementById("notificationHeader").innerHTML = 'You have '+notSize.toString()+' notifications';
    document.getElementById("warningHeader").innerHTML = 'You have '+warningSize.toString()+' warnings';


//        echoText.value += "Message received from to the server : " + message.data + "\n";
}
function wsClose(message){
//        echoText.value += "Disconnect ... \n";
}

function wserror(message){
    echoText.value += "Error ... \n";
}
