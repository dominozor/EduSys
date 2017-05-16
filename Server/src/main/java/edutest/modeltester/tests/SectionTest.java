package main.java.edutest.modeltester.tests;

import main.java.edutest.modeltester.ModelTester;
import main.java.models.Attendance;
import main.java.models.Section;
import org.junit.Before;
import org.junit.Test;

import java.util.logging.Logger;

import static org.junit.Assert.assertEquals;

/**
 * Created by enver on 5/2/17.
 */
public class SectionTest {


    private Section section;
    Logger logger;
    String currentTestName;

    @Before
    public void setUp() throws Exception {
        section = new Section("491",2,"1942085",45,5,35,25,40,"9x15");
        logger = Logger.getLogger("SectionLogger");
    }

    @Test
    public void getCourseID() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(section.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(section.getCourseID(),"491");
    }

    @Test
    public void getSectionNo() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(section.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(section.getSectionNo(),2);
    }

    @Test
    public void getUserID() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(section.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(section.getUserID(),"1942085");
    }

    @Test
    public void setCourseID() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(section.getClass().getSimpleName()+" Test: "+currentTestName);
        section.setCourseID("465");
        assertEquals(section.getCourseID(),"465");
    }

    @Test
    public void setSectionNo() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(section.getClass().getSimpleName()+" Test: "+currentTestName);
        section.setSectionNo(3);
        assertEquals(section.getSectionNo(),3);
    }

    @Test
    public void setUserID() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(section.getClass().getSimpleName()+" Test: "+currentTestName);
        section.setUserID("1942002");
        assertEquals(section.getUserID(),"1942002");
    }

    @Test
    public void setNumber_of_students() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(section.getClass().getSimpleName()+" Test: "+currentTestName);
        section.setNumber_of_students(35);
        assertEquals(section.getNumber_of_students(),35);
    }

    @Test
    public void setNumber_of_lectures() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(section.getClass().getSimpleName()+" Test: "+currentTestName);
        section.setNumber_of_lectures(35);
        assertEquals(section.getNumber_of_lectures(),35);
    }

    @Test
    public void getNumber_of_students() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(section.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(section.getNumber_of_students(),45);
    }

    @Test
    public void getNumber_of_lectures() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(section.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(section.getNumber_of_lectures(),5);
    }

    @Test
    public void setExam_percentage() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(section.getClass().getSimpleName()+" Test: "+currentTestName);
        section.setExam_percentage(45);
        assertEquals(section.getExam_percentage(),45);
    }

    @Test
    public void setSeating_place_percentage() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(section.getClass().getSimpleName()+" Test: "+currentTestName);
        section.setSeating_place_percentage(20);
        assertEquals(section.getSeating_place_percentage(),20);
    }

    @Test
    public void setAttendance_percentage() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(section.getClass().getSimpleName()+" Test: "+currentTestName);
        section.setAttendance_percentage(35);
        assertEquals(section.getAttendance_percentage(),35);
    }

    @Test
    public void getExam_percentage() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(section.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(section.getExam_percentage(),35);
    }

    @Test
    public void getSeating_place_percentage() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(section.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(section.getSeating_place_percentage(),25);
    }

    @Test
    public void getAttendance_percentage() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(section.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(section.getAttendance_percentage(),40);
    }

    @Test
    public void setClass_size() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(section.getClass().getSimpleName()+" Test: "+currentTestName);
        section.setClass_size("9x20");
        assertEquals(section.getClass_size(),"9x20");
    }

    @Test
    public void getClass_size() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(section.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(section.getClass_size(),"9x15");
    }
}
