package main.java.service;



import java.util.List;

import main.java.models.*;


public interface Service {
	
	
		
	//User Functions
	
	public void addPerson(EduUser person); //The function that adds the person to the database. Parameter of it a EduUser object which has the all information such as
										   //id, name, surname, email, password, profile picture link, link of the trained phorograph and role.	
	public void deletePerson(String id);   //The function that deletes the person from database. Parameter is the id of the person.
	
	public EduUser getPerson(String id);   //The function that gets the information of the person. Parameter is the id of the person.
	
	public List<EduUser> getAllPeople();   //The function that gets the information of all people.
	
	public void updatePerson(EduUser person);  //The function updates information of a person. Parameter is just like the addPerson.

	
	//Course Functions

	public void addCourse(Course course);  //The function that adds the course to the database. Parameter of it a Course object which has the all information such as id and name.
										  
	public void deleteCourse(String id);   //The function that deletes the course from database. Parameter is the id of the course.

	public void getCourse(String id);	   //The function that gets the information of the course. Parameter is the id of the course.

	public List<Course> getAllCourses();   //The function that gets the information of all courses.

	public void updateCourse(Course course);  //The function updates information of a course. Parameter is just like the getCourse.


	//Attendance Functions

	public void addAttendance(Attendance attendance); //The function that adds the course to the database. Parameter of it a Attendance object which has the all information such as 
													  //id, sectionNo, courseId and date.
	public void deleteAttendance(String id);   //The function that deletes the attendance from database. Parameter is the id of the attendance.

	public void getAttendance(String id);	   //The function that gets the information of the attendance. Parameter is the id of the attendance.

	public List<Course> getAllAttendances();   //The function that gets the information of all attendances.

	public void updateAttendance(Attendance attendance);  //The function updates information of a attendance. Parameter is just like the getAttendance.

	
	//StudentGrades Functions

	public void addStudentGrade(StudentGrade studentGrade); //The function that adds the grade to the database. Parameter of it a StudentGrade object which has the all information such as 
															//userId, examId and grade
	public void deleteStudentGrade(String userId, String examId);  //The function that deletes the grade from database. Parameters are the id of the student and id of the exam in order to express specific grade.

	public void getStudentGrade(String userId, String examId);  //The function that gets the grade. Parameters are the same as the deleteStudnetGrade function parameters.

	public List<StudentGrade> getAllStudentGrades();  //The function that gets the all grades.

	public void updateStudentGrade(StudentGrade studentGrade);  //The function updates information of a student grade. Parameter is just like the getStudentGrade.


	
}
