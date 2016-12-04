package main.utility;

import java.io.Serializable;
import java.io.SyncFailedException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import main.java.models.Attendance;
import main.java.models.Course;
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


	//----------------------------------------------------------------\\
	//FUNCTIONS FOR GENERATING GENERAL INFORMATIONS


	//This is the function in order to get attendance data of a student for every course he/she takes.
	//Gets an parameter id which is used to indicate which student's attendance is wanted
	public List<Attendance> listAttendanceForAStudent(String id) {

		Session session=null;

		try{
			session=createSession();
			//By using createQuery, the query is formed and data is retrieved from database.
			Query query = session.createQuery("select distinct att.id, att.courseId, att.date, att.sectionNo " +
					"from Course as c, AttendanceList as attL, Attendance as att, SectionStudentList as s " +
					"where attL.userID = '" + id + "' and s.userID = '" + id + "' and " +
					"att.id = attL.att_id and s.courseID = att.courseId and att.sectionNo = s.sectionNo " +
					"order by att.date" );

			//in query.list() function query is executed and result set is returned and casted to a Object List.
			List<Object[]> row = query.list();
			//a new Attendance List is initialized.
			//Then Attendance objects is formed for each row of the query result and put them to the Attendance List.
			List<Attendance> rows = new ArrayList<Attendance>();
			for(Object[] r : row) {
				Attendance attendance = new Attendance((String)r[0], (int)r[3], (String)r[1], (String)r[2]);
				rows.add(attendance);
			}
			session.close();
			return rows;
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



	//This is the function in order to get attendance data of a student for a specific course he/she takes.
	//Gets an parameter id which is used to indicate which student's attendance is wanted
	public List<Attendance> getCourseAttendanceForAStudent(String id, String course) {

		Session session=null;

		try{
			session=createSession();
			//By using createQuery, the query is formed and data is retrieved from database.
			Query query = session.createQuery("select distinct att.id, att.courseId, att.date, att.sectionNo " +
					"from Course as c, AttendanceList as attL, Attendance as att, SectionStudentList as s " +
					"where c.name = '" + course + "' and attL.userID = '" + id + "' and s.userID = '" + id + "' and " +
					"s.courseID = c.id and att.id = attL.att_id and att.courseId = c.id and att.sectionNo = s.sectionNo ");

			//in query.list() function query is executed and result set is returned
			List<Object[]> row = query.list();
			//a new Attendance List is initialized.
			//Then Attendance objects is formed for each row of the query result and put them to the Attendance List.
			List<Attendance> rows = new ArrayList<Attendance>();
			for(Object[] r : row) {
				Attendance attendance = new Attendance((String)r[0], (int)r[3], (String)r[1], (String)r[2]);
				rows.add(attendance);
			}
			//List<T> rows = (List<T>) query.list();
			session.close();
			return rows;
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



	//This is the function in order to get attendance data of a student for a specific course he/she takes.
	//Gets an parameter id which is used to indicate which student's attendance is wanted
	public List<Object[]> listCourseAttendanceForAStudent(String id, String course) {

		Session session=null;

		try{
			session=createSession();
			//By using createQuery, the query is formed and data is retrieved from database.
			Query query = session.createQuery("select distinct att.id, att.date, attL.userID " +
					"from Course as c, AttendanceList as attL, Attendance as att, SectionStudentList as sL, Section as s " +
					"where c.name = 'bio' and s.userID = '205' and s.courseID = c.id and sL.courseID = c.id and sL.sectionNo = s.sectionNo and " +
					"attL.userID = sL.userID and  att.id = attL.att_id and att.courseId = c.id " +
					"order by attL.userID\n" +
					"\n");

			//in query.list() function query is executed and result set is returned
			List<Object[]> row = query.list();
			session.close();
			return row;
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

    //Function to get all registered courses of a student
	public List<Object[]> listAllCoursesOfAStudent(String userID) {

		Session session=null;

		try{
			session=createSession(); //Create session

			//By using createNativeQuery, the query is formed and data is retrieved from database. It can be used as a SQL query.
            Query query = session.createNativeQuery("select cour.* from sectionstudentlist as sect, course as cour\n" +
                    "where sect.userid = '" + userID + "' and cour.id = sect.courseid " );

			//in query.list() function query is executed and result set is returned
			List<Object[]> row = query.list();
			session.close();
			return row;
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

	//Function to get all registered courses of a lecturer
	public List<Object[]> listAllCoursesOfALecturer(String userID) {

		Session session=null;

		try{
			session=createSession(); //Create session

			//By using createNativeQuery, the query is formed and data is retrieved from database. It can be used as a SQL query.
			Query query = session.createNativeQuery("select cour.* from section as sect, course as cour\n" +
					"where sect.userid = '" + userID + "' and cour.id = sect.courseid " );

			//in query.list() function query is executed and result set is returned
			List<Object[]> row = query.list();
			session.close();
			return row;
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

    //Function to get all registered courses of a lecturer
    public List<Object[]> listAllExamGradesOfAStudent(String userID) {

        Session session = null;

        try {
            session = createSession(); //Create session

            //By using createNativeQuery, the query is formed and data is retrieved from database. It can be used as a SQL query.
            Query query = session.createNativeQuery("select cr.name, stugra.grade, ex.type\n" +
                    "from studentgrade as stugra, exam as ex, course as cr\n" +
                    "where stugra.userid = '" + userID + "' and stugra.examid = ex.exam_id and ex.courseid = cr.id");

            //in query.list() function query is executed and result set is returned
            List<Object[]> row = query.list();
            session.close();
            return row;
        } catch (Exception e) {
            System.err.print(e);
        } finally {
            if (session != null && session.isOpen()) {

                session.close();
            }
        }
        return null;
    }

	//Function to get all previous lectures of a course
	public List<String> listDatesOfASection(String courseID, String sectionID) {

		Session session = null;

		try {
			session = createSession(); //Create session

			//By using createNativeQuery, the query is formed and data is retrieved from database. It can be used as a SQL query.
			Query query = session.createNativeQuery("select at.date from attendance as at\n" +
					"where at.courseid = '" + courseID + "' and at.sectionno = '" + sectionID  + "'");

			//in query.list() function query is executed and result set is returned
			List<String> row = query.list();
			session.close();
			return row;
		} catch (Exception e) {
			System.err.print(e);
		} finally {
			if (session != null && session.isOpen()) {

				session.close();
			}
		}
		return null;
	}




}
