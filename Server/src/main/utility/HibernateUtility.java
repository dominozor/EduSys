package main.utility;

import java.io.Serializable;
import java.util.Collections;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.annotations.Entity;
import org.hibernate.cfg.Configuration;

import javax.persistence.Table;

/**
*
* @author enver
*/

/*
This is a utility class for Hibernate. Basicly, after getting inputs for database usage, HibernateUtility sends,gets,updates or deletes entities from the right tables. 
*/

public class HibernateUtility {

	//Opens session for data transformation between server and database
	private Session createSession(){
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session= sessionFactory.openSession();
		return session;
	}
	//Creates entities for tables
	//Since I want this function to be generic, save function takes an Object object as an input.
	//You can send objects from any class, this funtion is going to use save function of Hibernate Session which finds the right table for the input object.
	public String save(Object obj){
		
		Session session=null;
		
		try{
			session=createSession();
			session.beginTransaction(); //Transaction starts...
			session.save(obj); // Saves the object for transaction
			session.getTransaction().commit(); //Commits and create entity for the table of that specific class
			return "success...";
			}
		catch(Exception e){
			return e.getMessage();
		}
		finally {
			if (session!=null && session.isOpen()) {
			    session.close();
			    
			}
		}

	}
	//Gets entities from tables by taking parameters which is used as a filter
	//"type" : Class of any type
	//"valueList" : Values of the filter parameters that are going to be used in queries
	//"columnNameList" : Names of the parameters
	public <T> List<T> get(Class<?> type, List<Serializable> valueList,List<String> columnNameList) {
		
		Session session=null;

		try{

			session=createSession();
			StringBuilder queryBuilder=new StringBuilder();
			//Creates hibernate queries 
			queryBuilder.append("from "+type.getName()+" where ");
			for(int i=0;i<columnNameList.size()-1;i++){
				queryBuilder.append(columnNameList.get(i)+" = :"+columnNameList.get(i)+" and ");
			}
			queryBuilder.append(columnNameList.get(columnNameList.size()-1)+" = :"+columnNameList.get(columnNameList.size()-1));
			Query query = session.createQuery(queryBuilder.toString());
			for(int i=0;i<columnNameList.size();i++) {
				query.setParameter(columnNameList.get(i),valueList.get(i));
			}
			//in query.list() function query is executed and result set is returned 
			List resultSet=query.list();
			session.close();
			return resultSet; //finally user fetches data
		}
		catch(Exception e){
			System.err.print(e);
		}
		finally {
	        if (session!=null && session.isOpen()) {
	        	
	            session.close();	            
	        }
		}
		return null;
		
	}
	//Gets all of the entities of a specific table
	//"clazz": Class of any type
	public <T> List<T> get(Class<?> clazz) {
		
		Session session=null;
		
		try{

			session=createSession();
			//Creates hibernate queries 
			Query query = session.createQuery("from "+ clazz.getName());
			//in query.list() function query is executed and result set is returned 
			//finally user fetches data
			List<T> rows = (List<T>) query.list();
			session.close();
			return Collections.unmodifiableList(rows);
		}
		catch(Exception e){
			System.err.print(e);
		}
		finally {
	        if (session!=null && session.isOpen()) {
	        	
	            session.close();   
	        }
		}
		return null;
		
	}
	//Deletes from a specific table which is determined by the class
	//"type" : Class of any type
	//"valueList" : Values of the filter parameters that are going to be used in queries
	//"columnNameList" : Names of the parameters
	public void delete(Class<?> type, List<Serializable> valueList,List<String> columnNameList) {
		
		Session session=null;
		
		try{
			session=createSession();
			StringBuilder queryBuilder=new StringBuilder();
			queryBuilder.append("delete from "+type.getName()+" where ");
			for(int i=0;i<columnNameList.size()-1;i++){
				queryBuilder.append(columnNameList.get(i)+" = :"+columnNameList.get(i)+" and ");
			}
			queryBuilder.append(columnNameList.get(columnNameList.size()-1)+" = :"+columnNameList.get(columnNameList.size()-1));
			Query query = session.createQuery(queryBuilder.toString());
			for(int i=0;i<columnNameList.size();i++) {
				query.setParameter(columnNameList.get(i),valueList.get(i));
			}
			//in query.list() function query is executed and result set is returned 
			//However it returns empty
			List resultSet=query.list();
			session.close();


		}
		catch(Exception e){
			System.err.print(e);
		}
		finally {
	        if (session!=null && session.isOpen()) {
	        	
	            session.close();
	           
	        }
		}
		
	}
	
	//"obj" : Object of any class which is going to be updated
	public void update(Object obj){
		Session session=null;
		
		try{
			session=createSession();
			session.beginTransaction();
			session.update(obj);// Saves the object for transaction
			session.getTransaction().commit();//Commits and update entity for the table of that specific class
			
			}
		catch(Exception e){
			System.err.print(e);
		}
		finally {
	        if (session!=null && session.isOpen()) {
	            session.close();
	        }
		}
	}


	
	
}
