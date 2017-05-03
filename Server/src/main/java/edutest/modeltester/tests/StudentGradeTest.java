package main.java.edutest.modeltester.tests;

import main.java.models.StudentGrade;
import org.junit.Before;
import org.junit.Test;

import java.util.logging.Logger;

import static org.junit.Assert.assertEquals;

/**
 * Created by enver on 5/2/17.
 */
public class StudentGradeTest {

    private StudentGrade grade;
    Logger logger;
    String currentTestName;

    @Before
    public void setUp() throws Exception {
        grade = new StudentGrade("1942085","DAEVASRT",65.5);
        logger = Logger.getLogger("SectionGradeLogger");
    }

    @Test
    public void getUserId() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(grade.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(grade.getUserId(),"1942085");
    }

    @Test
    public void setUserId() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(grade.getClass().getSimpleName()+" Test: "+currentTestName);
        grade.setUserId("1942002");
        assertEquals(grade.getUserId(),"1942002");
    }

    @Test
    public void getExamId() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(grade.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(grade.getExamId(),"DAEVASRT");
    }

    @Test
    public void setExamId() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(grade.getClass().getSimpleName()+" Test: "+currentTestName);
        grade.setExamId("KHLFFKAS");
        assertEquals(grade.getExamId(),"KHLFFKAS");
    }

    @Test
    public void getGrade() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(grade.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(grade.getGrade(),65.5,0);
    }

    @Test
    public void setGrade() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(grade.getClass().getSimpleName()+" Test: "+currentTestName);
        grade.setGrade(40.5);
        assertEquals(grade.getGrade(),40.5,0);
    }
}
