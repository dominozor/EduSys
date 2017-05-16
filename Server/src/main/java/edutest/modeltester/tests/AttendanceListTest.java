package main.java.edutest.modeltester.tests;

import main.java.models.AttendanceList;
import org.junit.Before;
import org.junit.Test;

import java.util.logging.Logger;

import static org.junit.Assert.assertEquals;

/**
 * Created by enver on 5/2/17.
 */
public class AttendanceListTest {

    private AttendanceList attendanceList;
    Logger logger;
    String currentTestName;

    @Before
    public void setUp() throws Exception {
        attendanceList = new AttendanceList("AKDLACASPE", "1942085",54,30,23,15,32);
        logger = Logger.getLogger("attendanceListLogger");
    }

    @Test
    public void getAtt_id() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(attendanceList.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(attendanceList.getAtt_id(),"AKDLACASPE");
    }

    @Test
    public void setAtt_id() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(attendanceList.getClass().getSimpleName()+" Test: "+currentTestName);
        attendanceList.setAtt_id("ETEHEDASE");
        assertEquals(attendanceList.getAtt_id(),"ETEHEDASE");

    }

    @Test
    public void getUserID() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(attendanceList.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(attendanceList.getUserID(),"1942085");
    }

    @Test
    public void getDistance() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(attendanceList.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(attendanceList.getDistance(),54,0);
    }

    @Test
    public void getTop() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(attendanceList.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(attendanceList.getTop(),30,0);
    }

    @Test
    public void getBottom() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(attendanceList.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(attendanceList.getBottom(),23,0);
    }

    @Test
    public void getRight() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(attendanceList.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(attendanceList.getRight(),15,0);
    }

    @Test
    public void getLeft() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(attendanceList.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(attendanceList.getLeft(),32,0);
    }

    @Test
    public void setDistance() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(attendanceList.getClass().getSimpleName()+" Test: "+currentTestName);
        attendanceList.setDistance(20);
        assertEquals(attendanceList.getDistance(),20,0);
    }

    @Test
    public void setTop() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(attendanceList.getClass().getSimpleName()+" Test: "+currentTestName);
        attendanceList.setTop(40);
        assertEquals(attendanceList.getTop(),40,0);
    }

    @Test
    public void setBottom() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(attendanceList.getClass().getSimpleName()+" Test: "+currentTestName);
        attendanceList.setBottom(23);
        assertEquals(attendanceList.getBottom(),23,0);
    }

    @Test
    public void setRight() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(attendanceList.getClass().getSimpleName()+" Test: "+currentTestName);
        attendanceList.setRight(10);
        assertEquals(attendanceList.getRight(),10,0);
    }

    @Test
    public void setLeft() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(attendanceList.getClass().getSimpleName()+" Test: "+currentTestName);
        attendanceList.setLeft(20);
        assertEquals(attendanceList.getLeft(),20,0);
    }

    @Test
    public void setUserID() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(attendanceList.getClass().getSimpleName()+" Test: "+currentTestName);
        attendanceList.setUserID("1942002");
        assertEquals(attendanceList.getUserID(),"1942002");
    }
}
