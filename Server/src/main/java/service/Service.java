package main.java.service;



import java.util.List;

import main.java.models.*;


public interface Service {
	
	
	
	
	public void addPerson(EduUser person); //The function that adds the person to the database. Parameter of it a EduUser object which has the all information such as
										   //id, name, surname, email, password, profile picture link, link of the trained phorograph and role.	
	public void deletePerson(String id);   //The function that deletes the person from database. Parameter is the id of the person.
	
	public EduUser getPerson(String id);   //The function that gets the information of the person. Parameter is the id of the person.
	
	public List<EduUser> getAllPeople();   //The function that gets the information of all people.
	
	public void updatePerson(EduUser person);  //The function that updates information of a person. Parameter is just like the addPerson.


	
}
