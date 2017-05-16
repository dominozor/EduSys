package main.java.edutest.modeltester;
import main.java.edutest.modeltester.tests.*;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;


import java.util.logging.Logger;


/**
 * Created by enver on 5/3/17.
 */
@RunWith(Suite.class)
@Suite.SuiteClasses({ AttendanceTest.class,
        AttendanceListTest.class,
        CourseTest.class,
        EduUserTest.class,
        ExamTest.class,
        NotificationTest.class,
        SectionStudentListTest.class,
        SectionTest.class,
        StudentGradeTest.class
         })
public class ModelTester {









}
