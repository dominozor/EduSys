package main.java.models;

import java.util.List;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;

import org.json.JSONObject;



/*
* This class is implemented for creating Course objects and store them persistantly
*
*/

//Hibernate gives a name to table itself and save it to the database.
@XmlRootElement
@Entity
//Every object becomes an entity when we want to persist data and store it in the database.

public class Attendance {
	@Id
	private String ID; //This is id of the attendance which is going to be saved.

	private int sectionNo;	//This shows the number of the section in which the attendance is taken for a specific course.
 
	private String courseId;	//This shows the course in which the attendance is taken.

	private DateTime date;	//This is the date at which the attendance is taken.

	public Attendance(){}
	public Attendance(String id, int sectionNo, String courseId, DateTime date){	//Constructor of the class.
		this.ID=id;
		this.sectionNo=sectionNo;
		this.courseId=courseId;
		this.date=date;
	}
	

	//Setters and getters of the class.

	public String getId(){
		return this.ID;
	}
	public void setId(String ID){
		this.ID=ID;
	}
	
	public int getSectionNo(){
		return this.sectionNo;
	}
	public void setSectionNo(int sectionNo){
		this.sectionNo=sectionNo;
	}
	
	public String getCourseId(){
		return this.courseId;
	}
	public void setCourseId(int courseId){
		this.courseId=courseId;
	}

	public DateTime getDate(){
		return this.date;
	}
	public void setDate(DateTime date){
		this.date=date;
	}
	
}
