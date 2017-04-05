package main.java.rest;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.GET;

import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import main.java.models.Exam;
import main.java.models.Notification;
import main.java.models.StudentGrade;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import main.java.service.Service;
import main.java.service.ServiceImpl;


@Path ("/studentGrade")
public class StudentGradeRestService {	
	
	Service service = new ServiceImpl().getInstance();


	@RolesAllowed({"ADMIN","LECTURER","STUDENT"})
	@GET 			/*This is the url of getting a student grade. When this url is called like http://localhost:8080/webapi/studentGrade/get/1942085, the JSON object will be formed
					for the student grade who has the ids. Then the object is returned.*/
	@Path("/get/{userID}/{examID}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getStudentGrade(@PathParam("userID") String userId,@PathParam("examID") String examId){ //The parameters are the user id of a student and exam id of a course.
		try {
			
			JSONObject jo = new JSONObject();		//A new JSON object is created.
			StudentGrade studentGrade = service.getStudentGrade(userId, examId);   //Getting student grade via REST service
			if(!(studentGrade==null)){
				jo.accumulate("userId", studentGrade.getUserId()); //Putting all information from service object to JSON object.
				jo.accumulate("examId", studentGrade.getExamId());
				jo.accumulate("grade", studentGrade.getGrade());
			}
			
			
			return Response.ok(jo.toString()).header("Access-Control-Allow-Origin", "*")  //Then return the JSON object with a response.
				.build();
		} catch (JSONException ex) {
			
		}
		return Response.serverError().build();
	}

	@RolesAllowed({"ADMIN","LECTURER"})
	@GET
	@Path("/get")		/*This is the url of getting all people's information. When this url is called like http://localhost:8080/webapi/studentGrade/get/, the JSON object will be formed
						for the grades of the all students. Then the object is returned.*/
	@Produces(MediaType.APPLICATION_JSON)
	public Response listStudentGrade(){
		try {
			JSONArray main = new JSONArray();		//A new JSON array object is created.
			List <StudentGrade> studentGrades = service.getAllStudentGrades(); //Getting all student grades via REST service.
			for(StudentGrade studentGrade : studentGrades){
				
				JSONObject jo = new JSONObject();   //A new JSON object for each student grade is created.
				jo.accumulate("userId", studentGrade.getUserId()); //Putting all information from service object to JSON object.
				jo.accumulate("examId", studentGrade.getExamId());
				jo.accumulate("grade", studentGrade.getGrade());
				
				main.put(jo);   //Put each JSON object to the JSON array object.
			}
			return Response.ok(main.toString()).header("Access-Control-Allow-Origin", "*")
				.build();
		} catch (JSONException ex) {
			
		}
		return Response.serverError().build();
	}

	@RolesAllowed({"ADMIN","LECTURER"})
	@POST
	@Path("/add")   /*This is the url of the adding a new student grade to the system. When a url is called,
					StudentGrade constructor is called and then a new StudentGrade is created and put to the database.*/
	@Produces(MediaType.TEXT_PLAIN)
	public Response addStudentGrade(@QueryParam("userId") String userId,@QueryParam("examId") String examId,@QueryParam("grade") double grade) {
		//The parameters of the addCourse are;
		//userId: id of the student who is going to be added.
		//examId: id of the exam which is going to be added.
		//grade: grade of the student for a specific exam.
		try{
			StudentGrade studentGrade=new StudentGrade(userId, examId, grade); //The parameters of the constructor are the same as the parameters of the addStudentGrade function.
			service.addStudentGrade(studentGrade);
			Exam exam=service.getExam(examId);
			service.saveNotification(new Notification(userId,"2","Grade Announcement\nCourse: "+exam.getCourseID()+"\n" +
					"Section: "+exam.getSectionNo()+"\nGrade: "+grade,"System",(new SimpleDateFormat("yyyyMMdd  HH:mm").format(new Date(System.currentTimeMillis()))).toString()));
			return Response.status(200).entity("success").build();	//It will return a success response if it is not failed.
		}
		catch(Exception ex){
			return Response.serverError().build();
		}

	}

	@RolesAllowed({"ADMIN","LECTURER"})
	@DELETE
	@Path("/delete/{userID}/{examID}")		/*This is the url of the delete a grade from the system. When this url is called like http://localhost:8080/webapi/studentGrade/delete/1942085,
								it will delete the grade from the database via REST service.*/
	@Produces(MediaType.TEXT_PLAIN)
	public Response deleteStudentGrade(@PathParam("userID") String userId, @PathParam("examID") String examId) {  //The function takes the user id of the student whose grade is going to be deleted.
		try{																									 //Also, it takes the id of the exam in order to express which exam's grade. 
			service.deleteStudentGrade(userId, examId);		//This is the deletion of the course via REST service.
			return Response.status(200).entity("success").build(); 
		}
		catch(Exception ex){
			return Response.serverError().build();
		}
	}

	@RolesAllowed({"ADMIN","LECTURER"})
	@PUT
	@Path("/update")
	@Produces(MediaType.TEXT_PLAIN)
	public Response updateStudentGrade(@QueryParam("userId") String userId,@QueryParam("examId") String examId,@QueryParam("grade") double grade) {
		//These parameters are the same as the addStudentGrade.
		StudentGrade studentGrade = service.getStudentGrade(userId, examId); //This gets the grade which has the userId and examId in the parameter.
		StudentGrade studentGrad=new StudentGrade(userId, examId, grade);  //This is the same arguments as the addStudentGrade function.
        try{
            service.updateStudentGrade(studentGrad);  //This updates the student grade.
			return Response.status(200).entity("success").build();   
		}
		catch(Exception ex){
			return Response.serverError().build();
		}
		
	}

	
}