package main.java.Composite_PKEY;

import java.io.Serializable;

/**
 * Created by enver on 5/9/17.
 */
public class ClassCourseR_PKEY implements Serializable {

    protected String class_id;
    protected String course_id;

    public ClassCourseR_PKEY() {}

    public ClassCourseR_PKEY(String class_id, String message){
        this.class_id=class_id;
        this.course_id=course_id;

    }

}
