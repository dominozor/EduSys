package main.java.service;

import java.util.ArrayList;
import java.util.List;

import main.java.models.*;

import main.utility.HibernateUtility;


public class ServiceImpl implements Service{
	
	HibernateUtility hibernateUtility= new HibernateUtility();
	private static Service instance = null;
	
	
	public static Service getInstance() {	
		if (instance == null) {
			return new ServiceImpl();
		} else {
			return instance;
		}
	}

	public void addPerson(EduUser person){  //This function is explained in Service.java
		hibernateUtility.save(person);      //This calls the hibernateUtility function that saves the person to the database.
	}

	public EduUser getPerson(String id){	//The function is explained in the Service.java
        List columnNameList=new ArrayList<String>(); 
		List valueList=new ArrayList<String>();
		columnNameList.add("id");			//This is the array that will be used in hibernateUtility to get the id column.
        valueList.add(id);					//This is the array that will be used in hibernateUtility to get value of the ids.
		return (EduUser) hibernateUtility.get(EduUser.class, valueList,columnNameList).get(0); //This returns the id of the person.
	}


	public List<EduUser> getAllPeople(){	
		return hibernateUtility.get(EduUser.class);  //This calles the get function in hibernateUtility end return the values.
	}
	public void deletePerson(String id){	//This function is the same as the getPerson.
        List columnNameList=new ArrayList<String>();
        List valueList=new ArrayList<String>();
        columnNameList.add("id");
        valueList.add(id);
		hibernateUtility.delete(EduUser.class, valueList,columnNameList);
	}
	
	public void updatePerson(EduUser person){ //This is explained in the Service.java.
		hibernateUtility.update(person);	  //This calls the function from hibernate updates the database.
	}
	
	
	
	




	
}
