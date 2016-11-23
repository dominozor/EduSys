package main.java.models;

import java.util.List;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;

import org.json.JSONObject;

/**
*
* @author enver
*/

@XmlRootElement
@Entity(name="\"EduUser\"")

public class EduUser {
	@Id
	@Column(name="\"id\"")
	private String ID;


	@Column(name="\"name\"")
	private String name;
	@Column(name="\"surname\"")
	private String surname;
	@Column(name="\"email\"")
	private String email;
	@Column(name="\"password\"")
	private String password;
	@Column(name="\"train_folder_link\"")
	private String trainLink;
	@Column(name="\"profile_pic_link\"")
	private String profilePic;
	@Column(name="\"user_role\"")
	private int role;

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
	
	
	
	
	
}
