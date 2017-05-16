package main.java.edutest.modeltester.tests;

import main.java.edutest.modeltester.ModelTester;
import main.java.models.Exam;
import org.junit.Before;
import org.junit.Test;

import java.util.logging.Logger;

import static org.junit.Assert.assertEquals;

/**
 * Created by enver on 5/2/17.
 */
public class ExamTest {

    private Exam exam;
    Logger logger;
    String currentTestName;

    @Before
    public void setUp() throws Exception {
        exam = new Exam("ADSDFE","490",2,"Midterm",67.44515,35);
        logger = Logger.getLogger("examLogger");
    }

    @Test
    public void getExam_id() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(exam.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(exam.getExam_id(),"ADSDFE");
    }

    @Test
    public void setExam_id() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(exam.getClass().getSimpleName()+" Test: "+currentTestName);
        exam.setExam_id("LALAEL");
        assertEquals(exam.getExam_id(),"LALAEL");
    }

    @Test
    public void getCourseID() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(exam.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(exam.getCourseID(),"490");
    }

    @Test
    public void setCourseID() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(exam.getClass().getSimpleName()+" Test: "+currentTestName);
        exam.setCourseID("435");
        assertEquals(exam.getCourseID(),"435");
    }

    @Test
    public void getSectionNo() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(exam.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(exam.getSectionNo(),"2");
    }

    @Test
    public void setSectionNo() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(exam.getClass().getSimpleName()+" Test: "+currentTestName);
        exam.setSectionNo(3);
        assertEquals(exam.getSectionNo(),"3");
    }

    @Test
    public void getType() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(exam.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(exam.getType(),"Midterm");
    }

    @Test
    public void setType() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(exam.getClass().getSimpleName()+" Test: "+currentTestName);
        exam.setType("Final");
        assertEquals(exam.getType(),"Final");
    }

    @Test
    public void getAverage() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(exam.getClass().getSimpleName()+" Test: "+currentTestName);

        assertEquals(exam.getAverage(),67.44515,0);
    }

    @Test
    public void setAverage() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(exam.getClass().getSimpleName()+" Test: "+currentTestName);
        exam.setAverage(55.6);
        assertEquals(exam.getAverage(),55.6,0);
    }

    @Test
    public void getExamPercentage() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(exam.getClass().getSimpleName()+" Test: "+currentTestName);

        assertEquals(exam.getExamPercentage(),35,0);
    }

    @Test
    public void setExamPercentage() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(exam.getClass().getSimpleName()+" Test: "+currentTestName);
        exam.setExamPercentage(40);
        assertEquals(exam.getExamPercentage(),40);
    }
}
