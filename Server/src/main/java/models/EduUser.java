package main.java.models;

import java.util.List;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;

import org.json.JSONObject;

/**
*
* @author enver
*/


/*
* This class is implemented for creating user objects and store them persistantly
*
*/

@XmlRootElement
@Entity
//Every object becomes an entity when we want to persist data and store it in the database.

public class EduUser {
	@Id //This shows that, the first element that comes after this annotiation becomes primary key.
	private String ID;



	private String name;
	private String surname;
	private String email;
	private String password;
	private String trainLink; //This store the folder link for data training
	private String profilePic;//This store the link for profile picture of the user
	private int role;//This holds the information about role of the user. It can be 0 (Admin) and 1 (User). I didn't do it boolean by considering there may be another roles for users.
	private boolean isActive;

	public EduUser(){}



	public EduUser(String id, String name, String surname, String email, String password, String trainLink, String profilePic, int role){
		this.ID=id;
		this.name=name;
		this.surname=surname;
		this.email=email;
		this.password=password;
		this.trainLink=null;
		this.profilePic=profilePic;
		this.role=role;
		this.isActive=false;
	}

	public String getName(){
		return this.name;
	}

	public void setName(String name){
		this.name=name;
	}

	public String getUsername(){
		return this.ID;
	}
	public void setUsername(String ID){
		this.ID=ID;
	}
	
	public String getSurname(){
		return this.surname;
	}
	public void setSurname(String surname){
		this.surname=surname;
	}
	
	public String getEmail(){
		return this.email;
	}
	public void setEmail(String email){
		this.email=email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getTrainLink() {
		return trainLink;
	}
	public void setTrainLink(String trainLink) {
		this.trainLink = trainLink;
	}
	public String getProfilePic() {
		return profilePic;
	}
	public void setProfilePic(String profilePic) {
		this.profilePic = profilePic;
	}

	public int getRole() {
		return role;
	}
	public void setRole(int role) {
		this.role = role;
	}

	public boolean isActive() {
		return isActive;
	}
	public void setActive(boolean active) {
		isActive = active;
	}
	
	
	
	
}
