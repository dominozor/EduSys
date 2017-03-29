package main.java.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by enver on 3/29/17.
 */
@XmlRootElement
@Entity
public class Notification {

    private String id;	//This is id of the student whose grade is going to be saved.

    private String type;  //This is the of the notification.

    private String message;

    private String sender;
    @Id
    private String date;


    private boolean viewed;

    public Notification(){}

    public Notification(String userId, String type, String message, String sender, String date) {
        this.id = userId;
        this.type = type;
        this.message = message;
        this.sender = sender;
        this.date = date;
    }

    public String getUserId() {
        return id;
    }

    public void setUserId(String userId) {
        this.id = userId;
    }


    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public boolean isViewed() {
        return viewed;
    }

    public void setViewed(boolean viewed) {
        this.viewed = viewed;
    }
}
