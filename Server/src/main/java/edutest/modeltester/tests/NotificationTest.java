package main.java.edutest.modeltester.tests;

import main.java.models.Notification;
import org.junit.Before;
import org.junit.Test;

import java.util.logging.Logger;

import static org.junit.Assert.assertEquals;

/**
 * Created by enver on 5/2/17.
 */
public class NotificationTest {

    private Notification notification;
    Logger logger;
    String currentTestName;

    @Before
    public void setUp() throws Exception {
        notification = new Notification("1942085","2","\"New Attendance Taken\\nCourse: \"+courseID+\"\\n\" +\n" +
                "                \"Section: \"+sectionNo+\"\\nDate: \"+sdt,\"System\"", "Teacher","15/04/2017" );
        logger = Logger.getLogger("courseLogger");
    }

    @Test
    public void getUserId() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(notification.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(notification.getUserId(),"1942085");
    }

    @Test
    public void setUserId() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(notification.getClass().getSimpleName()+" Test: "+currentTestName);
        notification.setUserId("1942002");
        assertEquals(notification.getUserId(),"1942002");
    }

    @Test
    public void getType() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(notification.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(notification.getType(),"2");
    }

    @Test
    public void setType() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(notification.getClass().getSimpleName()+" Test: "+currentTestName);
        notification.setType("1");
        assertEquals(notification.getType(),"1");
    }

    @Test
    public void getMessage() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(notification.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(notification.getMessage(),"\"New Attendance Taken\\nCourse: \"+courseID+\"\\n\" +\n" +
                "                \"Section: \"+sectionNo+\"\\nDate: \"+sdt,\"System\"");
    }

    @Test
    public void setMessage() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(notification.getClass().getSimpleName()+" Test: "+currentTestName);
        notification.setMessage("NULL MESSAGE\n");
        assertEquals(notification.getMessage(),"NULL MESSAGE\n");
    }

    @Test
    public void getSender() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(notification.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(notification.getSender(),"Teacher");
    }

    @Test
    public void setSender() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(notification.getClass().getSimpleName()+" Test: "+currentTestName);
        notification.setSender("Enver");
        assertEquals(notification.getSender(),"Enver");
    }

    @Test
    public void getDate() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(notification.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(notification.getDate(),"15/04/2017");
    }

    @Test
    public void setDate() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(notification.getClass().getSimpleName()+" Test: "+currentTestName);
        notification.setDate("17/04/2017");
        assertEquals(notification.getDate(),"17/04/2017");
    }

    @Test
    public void isViewed() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(notification.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(notification.isViewed(),false);
    }

    @Test
    public void setViewed() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(notification.getClass().getSimpleName()+" Test: "+currentTestName);
        notification.setViewed(true);
        assertEquals(notification.isViewed(),true);
    }
}
