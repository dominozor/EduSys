package main.java.models;

import main.java.Composite_PKEY.SectionStudentList_PKEY;
import main.java.Composite_PKEY.Section_PKEY;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by Enver.
 */

/*
* This class is implemented for creating section student list objects and store them persistantly
*
*/
@XmlRootElement
@Entity
@IdClass(SectionStudentList_PKEY.class)
//Every object becomes an entity when we want to persist data and store it in the database.
public class SectionStudentList {
    @Id //This shows that, the first element that comes after this annotiation becomes primary key.
    private String courseID;
    @Id //This shows that, the first element that comes after this annotiation becomes primary key.
    private int sectionNo;
    @Id //This shows that, the first element that comes after this annotiation becomes primary key.
    private String userID;
    //The table that this class represents has a composite primary key
    public SectionStudentList(){};

    public SectionStudentList(String courseID, int sectionNo, String userID ){

        this.courseID=courseID;
        this.sectionNo=sectionNo;
        this.userID=userID;

    }

    public String getCourseID() {
        return courseID;
    }

    public void setCourseID(String courseID) {
        this.courseID = courseID;
    }

    public int getSectionNo() {
        return sectionNo;
    }

    public void setSectionNo(int sectionNo) {
        this.sectionNo = sectionNo;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }
}
