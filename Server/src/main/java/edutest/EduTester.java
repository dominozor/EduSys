package main.java.edutest;

import main.java.edutest.eduresttester.RestTester;
import main.java.edutest.modeltester.ModelTester;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

/**
 * Created by enver on 5/2/17.
 */
@RunWith(Suite.class)
@Suite.SuiteClasses({
        ModelTester.class
})
public class EduTester  {

    private RestTester restTester;
    private ModelTester modelTester;

    public EduTester(){
        super();
    }

    @Test
    public void test(){
        System.out.println("LOL");
    }
}
