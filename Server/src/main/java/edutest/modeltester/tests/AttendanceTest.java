package main.java.edutest.modeltester.tests;

import main.java.models.Attendance;
import org.junit.Before;
import org.junit.Test;

import java.util.logging.Logger;

import static org.junit.Assert.*;

/**
 * Created by enver on 5/3/17.
 */

public class AttendanceTest{

    private Attendance attendance;
    Logger logger;
    String currentTestName;

    @Before
    public void setUp() throws Exception {
        attendance = new Attendance("ID", 2, "490", "22/10/2017", 40);
        logger = Logger.getLogger("attendanceLogger");
    }

    @Test
    public void getId() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(attendance.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(attendance.getId(),"ID");
    }

    @Test
    public void setId() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(attendance.getClass().getSimpleName()+" Test: "+currentTestName);
        attendance.setId("IDNEW");
        assertEquals(attendance.getId(),"IDNEW");
    }

    @Test
    public void getSectionNo() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(attendance.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(attendance.getSectionNo(),2);
    }

    @Test
    public void setSectionNo() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(attendance.getClass().getSimpleName()+" Test: "+currentTestName);
        attendance.setSectionNo(3);
        assertEquals(attendance.getSectionNo(),3);
    }

    @Test
    public void getCourseId() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(attendance.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(attendance.getCourseId(),"490");
    }

    @Test
    public void setCourseId() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(attendance.getClass().getSimpleName()+" Test: "+currentTestName);
        attendance.setCourseId("491");
        assertEquals(attendance.getCourseId(),"491");
    }

    @Test
    public void getDate() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(attendance.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(attendance.getDate(),"22/10/2017");
    }

    @Test
    public void setDate() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(attendance.getClass().getSimpleName()+" Test: "+currentTestName);
        attendance.setDate("23/10/2017");
        assertEquals(attendance.getDate(),"23/10/2017");
    }

    @Test
    public void getNumberOfStudents() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(attendance.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(attendance.getNumberOfStudents(),40);
    }

}