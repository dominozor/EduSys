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


public class Course {
	@Id
	private String ID;  //This is id of the course which is going to be saved.

	private String name;

	public Course(){}
	public Course(String id, String name){	//The constructor of the class.
		this.ID=id;
		this.name=name;
	}
	
	
	//Setters and getters of the attributes.

	public String getName(){
		return this.name;
	}
	public void setName(String name){
		this.name=name;
	}
	
	public String getId(){
		return this.ID;
	}
	public void setId(String ID){
		this.ID=ID;
	}
	
}
