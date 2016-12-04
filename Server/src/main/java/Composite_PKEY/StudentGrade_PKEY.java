package main.java.Composite_PKEY;
import java.io.Serializable;

//This is used if there are more than one primary keys.

public class StudentGrade_PKEY implements Serializable {
    protected String userId;	//This is the id of the user whose grade will be saved.
    protected String examId;	//This expresses the exam which the grade belongs to. 

    public StudentGrade_PKEY() {}

    public StudentGrade_PKEY(String userId, String examId){		//constructor of the composite primary key class.
        this.userId=userId;
        this.examId=examId;
    }
}
