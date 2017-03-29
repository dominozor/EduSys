package main.java.utility;


import main.java.models.Notification;
import main.java.service.Service;
import main.java.service.ServiceImpl;
import org.codehaus.jettison.json.JSONArray;

import org.codehaus.jettison.json.JSONObject;


import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.util.List;

/**
 * Created by enver on 3/29/17.
 */

@ServerEndpoint("/websocketendpoint")
public class NotificationUtility {
    private Service service = new ServiceImpl();

    @OnOpen
    public void onOpen(){
        System.out.println("Open Connection ...");
    }

    @OnClose
    public void onClose(){
        System.out.println("Close Connection ...");
    }

    @OnMessage
    public String onMessage(String userID){
        String result=null;
        try {

            List<Notification> notifications = service.getAllNotifications(userID);
            JSONArray arr = new JSONArray();
            for (Notification notification: notifications) {

                JSONObject jo = new JSONObject();

                jo.put("type",notification.getType());
                jo.put("date",notification.getDate());
                jo.put("sender",notification.getSender());
                jo.put("message",notification.getMessage());
                jo.put("isviewed",notification.isViewed());

                arr.put(jo);
            }
            result=arr.toString();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }

    @OnError
    public void onError(Throwable e){
        e.printStackTrace();
    }

}
