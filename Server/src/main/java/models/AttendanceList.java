package main.java.models;

import main.java.Composite_PKEY.AttendanceList_PKEY;
import main.java.Composite_PKEY.SectionStudentList_PKEY;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by Enver.
 */

/*
* This class is implemented for creating attendance list objects and store them persistantly
*
*/
@XmlRootElement
@Entity
@IdClass(AttendanceList_PKEY.class)
//Every object becomes an entity when we want to persist data and store it in the database.
public class AttendanceList {
    @Id //This shows that, the first element that comes after this annotiation becomes primary key.
    String att_id;
    @Id //This shows that, the first element that comes after this annotiation becomes primary key.
    String userID;
    double distance;
    double topCoor;
    double bottomCoor;
    double rightCoor;
    double leftCoor;
    //The table that this class represents has a composite primary key
    public AttendanceList(){}

    public AttendanceList(String att_id, String userID, double dist, double top,double bot,double right,double left){
        this.att_id=att_id;
        this.userID=userID;
        this.distance=dist;
        this.topCoor=top;
        this.bottomCoor=bot;
        this.rightCoor=right;
        this.leftCoor=left;
    }

    public String getAtt_id() {
        return att_id;
    }

    public void setAtt_id(String att_id) {
        this.att_id = att_id;
    }

    public String getUserID() {
        return userID;
    }

    public double getDistance() {
        return distance;
    }

    public double getTop() {
        return topCoor;
    }

    public double getBottom() {
        return bottomCoor;
    }

    public double getRight() {return rightCoor;}

    public double getLeft() {return leftCoor;}

    public void setDistance(double dist) {this.distance=dist;  }

    public void setTop(double top) {this.topCoor=top;  }

    public void setBottom(double bottom) {
        this.bottomCoor=bottom;
    }

    public void setRight(double right) {this.rightCoor=right;}

    public void setLeft(double left) {this.leftCoor=left;}


    public void setUserID(String userID) {
        this.userID = userID;
    }
}
