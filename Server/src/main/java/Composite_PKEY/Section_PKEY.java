package main.java.Composite_PKEY;

/**
 * Created by Enver.
 */

//This is a class that defines primary key for Section class
import java.io.Serializable;

public class Section_PKEY implements Serializable {
    protected String courseID;
    protected int sectionNo;

    public Section_PKEY() {}

    public Section_PKEY(String courseID, int sectionNo){
        this.courseID=courseID;
        this.sectionNo=sectionNo;
    }
}
