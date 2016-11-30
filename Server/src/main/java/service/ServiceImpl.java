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
	
	
	/* New class addition */

	//Course Functions

	public void addCourse(Course course){  //This function is explained in Service.java
		hibernateUtility.save(course);      //This calls the hibernateUtility function that saves the course to the database.
	}

	public Course getCourse(String id){	//The function is explained in the Service.java
        List columnNameList=new ArrayList<String>(); 
		List valueList=new ArrayList<String>();
		columnNameList.add("id");			//This is the array that will be used in hibernateUtility to get the id column.
        valueList.add(id);					//This is the array that will be used in hibernateUtility to get value of the ids.
		return (Course) hibernateUtility.get(Course.class, valueList,columnNameList).get(0); //This returns the id of the course.
	}


	public List<Course> getAllCourses(){	
		return hibernateUtility.get(Course.class);  //This calles the get function in hibernateUtility end return the values.
	}

	public void deleteCourse(String id){	//This function is the same as the getCourse.
        List columnNameList=new ArrayList<String>();
        List valueList=new ArrayList<String>();
        columnNameList.add("id");
        valueList.add(id);
		hibernateUtility.delete(Course.class, valueList,columnNameList);
	}
	
	public void updateCourse(Course course){ //This is explained in the Service.java.
		hibernateUtility.update(course);	  //This calls the function from hibernate updates a course in the database.
	}
	

	//Attendance Functions
	
	public void addAttendance(Attendance attendance){  //This function is explained in Service.java
		hibernateUtility.save(attendance);      //This calls the hibernateUtility function that saves the attendance to the database.
	}

	public void getAttendance(String id){	//The function is explained in the Service.java
        List columnNameList=new ArrayList<String>(); 
		List valueList=new ArrayList<String>();
		columnNameList.add("id");			//This is the array that will be used in hibernateUtility to get the id column.
        valueList.add(id);					//This is the array that will be used in hibernateUtility to get value of the ids.
		return (Attendance) hibernateUtility.get(Attendace.class, valueList,columnNameList).get(0); //This returns the id of the attendance.
	}


	public List<Attendacne> getAllAttendance(){	
		return hibernateUtility.get(Attendance.class);  //This calles the get function in hibernateUtility end return the values.
	}

	public void deleteAttendances(String id){	//This function is the same as the getAttendance.
        List columnNameList=new ArrayList<String>();
        List valueList=new ArrayList<String>();
        columnNameList.add("id");
        valueList.add(id);
		hibernateUtility.delete(Attendance.class, valueList,columnNameList);
	}
	
	public void updateAttendance(Attendance attendance){ //This is explained in the Service.java.
		hibernateUtility.update(attendance);	  //This calls the function from hibernate updates an attendace in the database.
	}
	



	//StudentGrades Functions
	
	public void addStudentGrade(StudentGrade studentGrade){  //This function is explained in Service.java
		hibernateUtility.save(studentGrade);      //This calls the hibernateUtility function that saves the student grade to the database.
	}

	public void getStudentGrade(String userId, String examId){	//The function is explained in the Service.java
        List columnNameList=new ArrayList<String>(); 
		List valueList=new ArrayList<String>();
		columnNameList.add("userId");			//This is the array that will be used in hibernateUtility to get the id column.
		columnNameList.add("examId");
        valueList.add(userId);					//This is the array that will be used in hibernateUtility to get value of the ids.
        valueList.add(examId)
		return (StudentGrade) hibernateUtility.get(StudentGrade.class, valueList,columnNameList).get(0); //This returns the id of the student grade.
	}


	public List<StudentGrade> getAllStudentGrades(){	
		return hibernateUtility.get(StudentGrade.class);  //This calles the get function in hibernateUtility end return the values.
	}

	public void deleteStudentGrade(String userId, String examId){	//This function is the same as the getStudentGrade.
        List columnNameList=new ArrayList<String>();
        List valueList=new ArrayList<String>();
        columnNameList.add("userId");
        columnNameList.add("examId");
        valueList.add(userId);
        valueList.add(examId);
		hibernateUtility.delete(StudentGrade.class, valueList,columnNameList);
	}
	
	public void updateStudentGrade(StudentGrade studentGrade){ //This is explained in the Service.java.
		hibernateUtility.update(studentGrade);	  //This calls the function from hibernate updates a student grade the database.
	}
	
	




	
}
