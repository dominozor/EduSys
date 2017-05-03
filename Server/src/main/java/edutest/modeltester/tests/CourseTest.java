package main.java.edutest.modeltester.tests;


import main.java.models.Course;
import org.junit.Before;
import org.junit.Test;

import java.util.logging.Logger;

import static org.junit.Assert.assertEquals;

/**
 * Created by enver on 5/2/17.
 */
public class CourseTest{

    private Course course;
    Logger logger;
    String currentTestName;

    @Before
    public void setUp() throws Exception {
        course=new Course("490","TempCourse");
        logger = Logger.getLogger("courseLogger");
    }

    @Test
    public void getName() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(course.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(course.getName(),"TempCourse");
    }

    @Test
    public void setName() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(course.getClass().getSimpleName()+" Test: "+currentTestName);
        course.setName("Example2");
        assertEquals(course.getName(),"Example2");
    }

    @Test
    public void getId() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(course.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(course.getId(),"490");
    }

    @Test
    public void setId() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(course.getClass().getSimpleName()+" Test: "+currentTestName);
        course.setId("492");
        assertEquals(course.getId(),"492");
    }
}
