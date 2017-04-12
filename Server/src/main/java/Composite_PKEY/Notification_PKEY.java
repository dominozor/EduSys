package main.java.Composite_PKEY;

import java.io.Serializable;

/**
 * Created by enver on 4/11/17.
 */
public class Notification_PKEY implements Serializable {
    protected String id;
    protected String message;
    protected String date;

    public Notification_PKEY() {}

    public Notification_PKEY(String id, String message, String date){
        this.id=id;
        this.message=message;
        this.date=date;
    }
}
