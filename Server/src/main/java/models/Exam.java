package main.java.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by Enver.
 */

/*
* This class is implemented for creating exam objects and store them persistantly
*
*/
@XmlRootElement
@Entity
//Every object becomes an entity when we want to persist data and store it in the database.
public class Exam {
    @Id //This shows that, the first element that comes after this annotiation becomes primary key.
    private String exam_id;
    private String courseID;
    private String sectionNo;
    private String type;
    private double average;

    public Exam(){}

    public Exam(String exam_id,String courseID,String sectionNo,String type,double average){

        this.exam_id=exam_id;
        this.courseID=courseID;
        this.sectionNo=sectionNo;
        this.type=type;
        this.average=average;

    }

    public String getExam_id() {
        return exam_id;
    }

    public void setExam_id(String exam_id) {
        this.exam_id = exam_id;
    }

    public String getCourseID() {
        return courseID;
    }

    public void setCourseID(String courseID) {
        this.courseID = courseID;
    }

    public String getSectionNo() {
        return sectionNo;
    }

    public void setSectionNo(String sectionNo) {
        this.sectionNo = sectionNo;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getAverage() {
        return average;
    }

    public void setAverage(double average) {
        this.average = average;
    }
}
