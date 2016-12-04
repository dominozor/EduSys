package main.java.rest;

import javax.ws.rs.GET;

import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import main.java.models.Attendance;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import main.java.service.Service;
import main.java.service.ServiceImpl;


@Path ("/attendance")
public class AttendanceRestService {
	
	Service service = new ServiceImpl().getInstance();


	@GET 			/*This is the url of getting a attendance information. When this url is called like http://localhost:8080/webapi/attendance/get/1942085, the JSON object will be formed 
					for the attendance information. Then the object is returned.*/
	@Path("/get/{ID}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAttendance(@PathParam("ID") String id){ //The parameter is the id of the attendance which comes from the url.
		try {
			
			
			JSONObject jo = new JSONObject();		//A new JSON object is created.
			Attendance attendance = service.getAttendance(id);   //Getting attendance information via REST service
			if(!(attendance==null)){
				jo.accumulate("id", attendance.getId()); //Putting all information from service object to JSON object.
				jo.accumulate("sectionNo", attendance.getSectionNo());
				jo.accumulate("courseId", attendance.getCourseId());
				jo.accumulate("date", attendance.getDate());
			}
			
			
			return Response.ok(jo).header("Access-Control-Allow-Origin", "*")  //Then return the JSON object with a response.
				.build();
		} catch (JSONException ex) {
			
		}
		return Response.serverError().build();
	}
	
	@GET
	@Path("/get")		/*This is the url of getting all attendance information. When this url is called like http://localhost:8080/webapi/attendance/get/, the JSON object will be formed 
						for the attendance information. Then the object is returned.*/
	@Produces(MediaType.APPLICATION_JSON)
	public Response listAttendance(){
		try {
			JSONArray main = new JSONArray();		//A new JSON array object is created.
			List <Attendance> attendances = service.getAllAttendances(); //Getting all attendance information via REST service.
			for(Attendance attendance : attendances){
				
				JSONObject jo = new JSONObject();   //A new JSON object for each attendance is created.
				jo.accumulate("id", attendance.getId()); //Putting all information from service object to JSON object.
				jo.accumulate("sectionNo", attendance.getSectionNo());
				jo.accumulate("courseId", attendance.getCourseId());
				jo.accumulate("date", attendance.getDate());
				
				main.put(jo);   //Put each JSON object to the JSON array object.
			}
			return Response.ok(main).header("Access-Control-Allow-Origin", "*")  
				.build();
		} catch (JSONException ex) {
			
		}
		return Response.serverError().build();
	}
	
	@POST
	@Path("/add")   /*This is the url of the adding a new course to the system. When this url is called 
					Attendance constructor is called and then a new course is created and put to the database.*/
	@Produces(MediaType.TEXT_PLAIN)
	public Response addAttendance(@QueryParam("ID") String id,@QueryParam("sectionNo") int sectionNo,@QueryParam("courseId") String courseId,@QueryParam("date") String date) {
		//The parameters of the addCourse are;
		//id: id of the attendance which is going to be added.
		//sectionNo: section number of the attendance. It expresses for which section this attendance is used.
		try{
			Attendance attendance=new Attendance(id, sectionNo, courseId, date); //The parameters of the constructor are the same as the parameters of the addAttendace function.
			service.addAttendance(attendance);
			return Response.status(200).entity("success").build();	//It will return a success response if it is not failed.
		}
		catch(Exception ex){
			return Response.serverError().build();
		}

	}
	
	@DELETE
	@Path("/delete/{id}")		/*This is the url of the deleting an attendance from the system. When this url is called like http://localhost:8080/webapi/attendance/delete/1942085,
								it will delete the attendance from the database via REST service.*/
	@Produces(MediaType.TEXT_PLAIN)
	public Response deleteAttendance(@PathParam("id") String id) {  //The function takes the id of the attendance which is going to be deleted.
		try{
			service.deleteAttendance(id);		//This is the deletion of the course via REST service.
			return Response.status(200).entity("success").build(); 
		}
		catch(Exception ex){
			return Response.serverError().build();
		}
	}
	
	@PUT
	@Path("/update")
	@Produces(MediaType.TEXT_PLAIN)
	public Response updateAttendance(@QueryParam("ID") String id,@QueryParam("sectionNo") int sectionNo,@QueryParam("courseId") String courseId,@QueryParam("date") String date) {
		//These parameters are the same as the addAttendance.
		Attendance attendance = service.getAttendance(id); //This gets the attendance which has the id in the parameter.
		Attendance attend=new Attendance(id, sectionNo, courseId, date);  //This is the same arguments as the addAttendance function.
		try{
			service.updateAttendance(attend);  //This updates the attendance information.
			return Response.status(200).entity("success").build();   
		}
		catch(Exception ex){
			return Response.serverError().build();
		}
		
	}

	//----------------------------------------------------------------\\
	//FUNCTIONS FOR GENERATING GENERAL INFORMATIONS

	@GET
	@Path("/getAllAttendance/{ID}") /*This is the url of getting all attendance from the system. When this url is called like
									http://localhost:8090/webapi/attendance/getAllAttendance/1941665,
									it will get the attendance data from the database via REST service.*/
	@Produces(MediaType.APPLICATION_JSON)
	public Response listAttendanceForAStudent(@PathParam("ID") String id) { //The parameter which comes from the url is the id of the student
																			//whose attendance data will be got.
		try {

			JSONArray main = new JSONArray();		//A new JSON array object is created.
			List <Attendance> attendances = service.listStudentAttendance(id); //Getting all attendance data via REST service.
			for(Attendance attendance : attendances){

				JSONObject json = new JSONObject();   //A new JSON object for each attendance is created.
				json.accumulate("id", attendance.getId()); //Putting all information from service object to JSON object.
				json.accumulate("sectionNo", attendance.getSectionNo());
				json.accumulate("courseId", attendance.getCourseId());
				json.accumulate("date", attendance.getDate());

				main.put(json);   //Put each JSON object to the JSON array object.
			}
			return Response.ok(main).header("Access-Control-Allow-Origin", "*")
					.build();

		} catch (JSONException e) {
			e.printStackTrace();
		}

		return Response.serverError().build();
	}



	@GET
	@Path("/getCourseAttendance/{ID}/{Course}")/*This is the url of getting attendance data for a specific course from the system. When this url is
												called like http://localhost:8090/webapi/attendance/getCourseAttendance/1941665/graph,
												it will get the attendance data from the database via REST service.*/
	@Produces(MediaType.APPLICATION_JSON)
	//The parameters which come from the url are the id of the student whose attendance data will be got and the course name for which course
	//the attendance data will be got.
	public Response getCourseAttendanceForAStudent(@PathParam("ID") String id, @PathParam("Course") String course) {

		try {

			JSONArray main = new JSONArray();		//A new JSON array object is created.
			List <Attendance> attendances = service.getStudentCourseAttendance(id,course); //Getting all attendance information via REST service.
			for(Attendance attendance : attendances){

				JSONObject json = new JSONObject();   //A new JSON object for each attendance is created.
				json.accumulate("id", attendance.getId()); //Putting all information from service object to JSON object.
				json.accumulate("sectionNo", attendance.getSectionNo());
				json.accumulate("courseId", attendance.getCourseId());
				json.accumulate("date", attendance.getDate());

				main.put(json);   //Put each JSON object to the JSON array object.
			}
			return Response.ok(main).header("Access-Control-Allow-Origin", "*")
					.build();

		} catch (JSONException e) {
			e.printStackTrace();
		}

		return Response.serverError().build();
	}



	@GET
	@Path("/getAllAttendance/{Course}/{UserID}")/*This is the url of getting attendance data for a specific course from the system. When this url is
												called like http://localhost:8090/webapi/attendance/getCourseAttendance/1941665/graph,
												it will get the attendance data from the database via REST service.*/
	@Produces(MediaType.APPLICATION_JSON)
	//The parameters which come from the url are the id of the student whose attendance data will be got and the course name for which course
	//the attendance data will be got.
	public Response listAllStudentsAttendance(@PathParam("Course") String course, @PathParam("UserID") String userID) {

		try {

			JSONArray main = new JSONArray();		//A new JSON array object is created.
			List <Object[]> attendances = service.getAllStudentsAttendance(course, userID); //Getting all attendance information via REST service.
			for(Object[] attendance : attendances){

				JSONObject json = new JSONObject();   //A new JSON object for each attendance is created.
				json.accumulate("id", attendance[0]); //Putting all information from service object to JSON object.
				json.accumulate("date", attendance[1]);
				json.accumulate("userID", attendance[2]);

				main.put(json);   //Put each JSON object to the JSON array object.
			}
			return Response.ok(main).header("Access-Control-Allow-Origin", "*")
					.build();

		} catch (JSONException e) {
			e.printStackTrace();
		}

		return Response.serverError().build();
	}

}