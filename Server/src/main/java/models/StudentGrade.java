package main.java.models;

import java.util.List;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;

import org.json.JSONObject;


/*
* This class is implemented for creating StudentGrade objects and store them persistantly
*
*/

//Hibernate gives a name to table itself and save it to the database.
@XmlRootElement
@Entity
@IdClass(StudentGrades_PKEY.class)
//Every object becomes an entity when we want to persist data and store it in the database.

public class StudentGrade {
	@Id
    private String userId;	//This is id of the student whose grade is going to be saved.
    @Id
    private String examId;  //This is id of the exam to indicate which grade.

	private double grade;

	public StudentGrade(){}
	public StudentGrade(String userId, String examId, double grade){  //The constructor of the class.
		this.userId=userId;
		this.examId=examId;
		this.grade=grade;
	}
	
	//Setters and getters of the attributes.

	public String getUserId(){
		return this.userId;
	}
	public void setUserId(String userId){
		this.userId=userId;
	}
	
	public String getExamId(){
		return this.examId;
	}
	public void setExamId(String examId){
		this.examId=examId;
	}

	public double getGrade(){
		return this.grade;
	}
	public void setGrade(double grade){
		this.grade=grade;
	}
	
}
