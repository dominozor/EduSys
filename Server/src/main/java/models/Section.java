package main.java.models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;


import main.java.Composite_PKEY.Section_PKEY;
import org.json.JSONObject;

/**
 *
 * @author enver
 */
/*
* This class is implemented for creating section objects and store them persistantly
*
*/
@XmlRootElement
@Entity
@IdClass(Section_PKEY.class)
//Every object becomes an entity when we want to persist data and store it in the database.
public class Section {
    @Id//This shows that, the first element that comes after this annotiation becomes primary key.
    private String courseID;
    @Id//This shows that, the first element that comes after this annotiation becomes primary key.
    private int sectionNo;
    //The table that this class represents has a composite primary key
    private String userID;

    private int number_of_students;

    private int number_of_lectures;

    public Section(){}
    public Section(String courseID, int sectionNo, String userID, int number_of_students, int number_of_lectures){
        this.courseID=courseID;
        this.sectionNo=sectionNo;
        this.userID=userID;
        this.number_of_lectures=number_of_lectures;
        this.number_of_students=number_of_students;
    }


    public String getCourseID() {
        return courseID;
    }

    public int getSectionNo() {
        return sectionNo;
    }

    public String getUserID() {
        return userID;
    }

    public void setCourseID(String courseID) {
        this.courseID = courseID;
    }

    public void setSectionNo(int sectionNo) {
        this.sectionNo = sectionNo;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public void setNumber_of_students(int number_of_students) {
        this.number_of_students = number_of_students;
    }

    public void setNumber_of_lectures(int number_of_lectures) {
        this.number_of_lectures = number_of_lectures;
    }

    public int getNumber_of_students() {
        return number_of_students;
    }

    public int getNumber_of_lectures() {
        return number_of_lectures;
    }
}
