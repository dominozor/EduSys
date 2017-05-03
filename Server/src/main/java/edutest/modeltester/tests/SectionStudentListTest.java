package main.java.edutest.modeltester.tests;

import main.java.models.Course;
import main.java.models.SectionStudentList;
import org.junit.Before;
import org.junit.Test;

import java.util.logging.Logger;

import static org.junit.Assert.assertEquals;

/**
 * Created by enver on 5/2/17.
 */
public class SectionStudentListTest {

    private SectionStudentList sectionStudentList;
    Logger logger;
    String currentTestName;

    @Before
    public void setUp() throws Exception {
        sectionStudentList=new SectionStudentList("491", 2, "1942085");
        logger = Logger.getLogger("SSLLogger");
    }

    @Test
    public void getCourseID() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(sectionStudentList.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(sectionStudentList.getCourseID(),"491");
    }

    @Test
    public void setCourseID() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(sectionStudentList.getClass().getSimpleName()+" Test: "+currentTestName);
        sectionStudentList.setCourseID("499");
        assertEquals(sectionStudentList.getCourseID(),"499");
    }

    @Test
    public void getSectionNo() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(sectionStudentList.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(sectionStudentList.getSectionNo(),2);
    }

    @Test
    public void setSectionNo() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(sectionStudentList.getClass().getSimpleName()+" Test: "+currentTestName);
        sectionStudentList.setSectionNo(1);
        assertEquals(sectionStudentList.getSectionNo(),1);
    }

    @Test
    public void getUserID() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(sectionStudentList.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(sectionStudentList.getUserID(),"1942085");
    }

    @Test
    public void setUserID() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(sectionStudentList.getClass().getSimpleName()+" Test: "+currentTestName);
        sectionStudentList.setUserID("1942002");
        assertEquals(sectionStudentList.getUserID(),"1942002");
    }
}
