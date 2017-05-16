package main.java.edutest.modeltester.tests;

import main.java.models.Attendance;
import main.java.models.Course;
import main.java.models.EduUser;
import org.junit.Before;
import org.junit.Test;

import java.util.logging.Logger;

import static org.junit.Assert.*;

/**
 * Created by enver on 5/3/17.
 */
public class EduUserTest {

    private EduUser user;
    Logger logger;
    String currentTestName;

    @Before
    public void setUp() throws Exception {
        user=new EduUser("1942085", "Enver", "Evci", "enverevci@gmail.com", "32fjdskrıl4kjnspo4rı2*j4ekf", "./trainLink", "./profilePic", 0);
        logger = Logger.getLogger("userLogger");
    }



    @Test
    public void getName() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(user.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(user.getName(),"Enver");
    }

    @Test
    public void setName() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(user.getClass().getSimpleName()+" Test: "+currentTestName);
        user.setName("Enver2");
        assertEquals(user.getName(),"Enver2");
    }

    @Test
    public void getUsername() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(user.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(user.getUsername(),"1942085");
    }

    @Test
    public void setUsername() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(user.getClass().getSimpleName()+" Test: "+currentTestName);
        user.setUsername("ID2");
        assertEquals(user.getUsername(),"ID2");
    }

    @Test
    public void getSurname() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(user.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(user.getSurname(),"Evci");
    }

    @Test
    public void setSurname() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(user.getClass().getSimpleName()+" Test: "+currentTestName);
        user.setSurname("Evci2");
        assertEquals(user.getSurname(),"Evci2");
    }

    @Test
    public void getEmail() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(user.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(user.getEmail(),"enverevci@gmail.com");
    }

    @Test
    public void setEmail() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(user.getClass().getSimpleName()+" Test: "+currentTestName);
        user.setEmail("enver2evci@gmail.com");
        assertEquals(user.getEmail(),"enver2evci@gmail.com");
    }

    @Test
    public void getPassword() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(user.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(user.getPassword(),"32fjdskrıl4kjnspo4rı2*j4ekf");
    }

    @Test
    public void setPassword() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(user.getClass().getSimpleName()+" Test: "+currentTestName);
        user.setPassword("akjsdmşlecmşaslşdasd2o");
        assertEquals(user.getPassword(),"akjsdmşlecmşaslşdasd2o");
    }

    @Test
    public void getTrainLink() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(user.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(user.getTrainLink(),null);
    }

    @Test
    public void setTrainLink() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(user.getClass().getSimpleName()+" Test: "+currentTestName);
        user.setTrainLink("./trainLink2");
        assertEquals(user.getTrainLink(),"./trainLink2");
    }

    @Test
    public void getProfilePic() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(user.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(user.getProfilePic(),"./profilePic");
    }

    @Test
    public void setProfilePic() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(user.getClass().getSimpleName()+" Test: "+currentTestName);
        user.setProfilePic("./profilePic2");
        assertEquals(user.getProfilePic(),"./profilePic2");
    }

    @Test
    public void getRole() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(user.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(user.getRole(),0);
    }

    @Test
    public void setRole() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(user.getClass().getSimpleName()+" Test: "+currentTestName);
        user.setRole(1);
        assertEquals(user.getRole(),1);
    }

    @Test
    public void isActive() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(user.getClass().getSimpleName()+" Test: "+currentTestName);
        assertEquals(user.isActive(),false);
    }

    @Test
    public void setActive() throws Exception {
        currentTestName=Thread.currentThread().getStackTrace()[1].getMethodName();
        logger.info(user.getClass().getSimpleName()+" Test: "+currentTestName);
        user.setActive(true);
        assertEquals(user.isActive(),true);
    }

}