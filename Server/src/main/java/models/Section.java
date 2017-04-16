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

    private int exam_percentage;

    private int seating_place_percentage;

    private int attendance_percentage;

    private String class_size;

    public Section(){}
    public Section(String courseID, int sectionNo, String userID, int number_of_students, int number_of_lectures,
                        int exam_percentage, int seating_place_percentage, int attendance_percentage, String class_size){
        this.courseID=courseID;
        this.sectionNo=sectionNo;
        this.userID=userID;
        this.number_of_lectures=number_of_lectures;
        this.number_of_students=number_of_students;
        this.exam_percentage=exam_percentage;
        this.seating_place_percentage=seating_place_percentage;
        this.attendance_percentage=attendance_percentage;
        this.class_size=class_size;
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

    public void setExam_percentage(int exam_percentage) { this.exam_percentage = exam_percentage; }

    public void setSeating_place_percentage(int seating_place_percentage) { this.seating_place_percentage = seating_place_percentage; }

    public void setAttendance_percentage(int attendance_percentage) { this.attendance_percentage = attendance_percentage; }

    public int getExam_percentage() { return exam_percentage; }

    public int getSeating_place_percentage() { return seating_place_percentage; }

    public int getAttendance_percentage() { return attendance_percentage; }

    public void setClass_size(String class_size) { this.class_size = class_size; }

    public String getClass_size() { return class_size; }
}
