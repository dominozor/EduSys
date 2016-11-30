package main.java.Composite_PKEY;

/**
 * Created by Enver.
 */


import java.io.Serializable;

//This is a class that defines primary key for SectionStudentList class
public class SectionStudentList_PKEY implements Serializable {
    protected String courseID;
    protected int sectionNo;
    protected String userID;

    public SectionStudentList_PKEY() {}

    public SectionStudentList_PKEY(String courseID, int sectionNo, String userID){
        this.courseID=courseID;
        this.sectionNo=sectionNo;
        this.userID=userID;
    }
}
