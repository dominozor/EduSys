package main.java.Composite_PKEY;

import java.io.Serializable;

/**
 * Created by Enver.
 */


//This is a class that defines primary key for AttendanceList class
public class AttendanceList_PKEY implements Serializable {
    protected String att_id;
    protected String userID;

    public AttendanceList_PKEY() {}

    public AttendanceList_PKEY(String att_id, String userID){
        this.att_id=att_id;
        this.userID=userID;
    }

}
