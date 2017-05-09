package main.java.models;

import main.java.Composite_PKEY.ClassCourseR_PKEY;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by enver on 5/9/17.
 */
@XmlRootElement
@Entity
@IdClass(ClassCourseR_PKEY.class)
public class ClassCourseRelationship {
    @Id
    private String class_id;
    @Id
    private String course_id;

    public ClassCourseRelationship(String class_id, String course_id){
        this.class_id=class_id;
        this.course_id=course_id;
    }

    public ClassCourseRelationship() {
    }

    public String getClassID(){
        return this.class_id;
    }
    public String getCourseID(){
        return  this.course_id;
    }


    public void setClassID(String class_id){
        this.class_id=class_id;
    }
    public void setCourseID(String course_id){
        this.course_id=course_id;
    }
}
