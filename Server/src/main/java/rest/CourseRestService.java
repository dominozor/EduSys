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

import main.java.models.Course;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import main.java.service.Service;
import main.java.service.ServiceImpl;


@Path ("/course")
public class CourseRestService {	
	
	Service service = new ServiceImpl().getInstance();


	@GET 			/*This is the url of getting a course's information. When this url is called like http://localhost:8080/webapi/course/get/1942085, the JSON object will be formed 
					for the information of the course who has the id. Then the object is returned.*/
	@Path("/get/{ID}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCourse(@PathParam("ID") String id){ //The parameter is the id of the course which comes from the url.
		try {
			
			
			JSONObject jo = new JSONObject();		//A new JSON object is created.
			Course course = service.getCourse(id);   //Getting course information via REST service
			if(!(course==null)){
				jo.accumulate("id", course.getId()); //Putting all information from service object to JSON object.
				jo.accumulate("name", course.getName());
			}
			
			
			return Response.ok(jo).header("Access-Control-Allow-Origin", "*")  //Then return the JSON object with a response.
				.build();
		} catch (JSONException ex) {
			
		}
		return Response.serverError().build();
	}
	
	@GET
	@Path("/get")		/*This is the url of getting all courses' information. When this url is called like http://localhost:8080/webapi/course/get/, the JSON object will be formed 
						for the information of the all courses'. Then the object is returned.*/
	@Produces(MediaType.APPLICATION_JSON)
	public Response listCourse(){
		try {
			JSONArray main = new JSONArray();		//A new JSON array object is created.
			List <Course> courses = service.getAllCourses(); //Getting all courses' information via REST service.
			for(Course course : courses){
				
				JSONObject jo = new JSONObject();   //A new JSON object for each course is created.
				jo.accumulate("id", course.getId());  //Putting all information from service object to JSON object.
				jo.accumulate("name", course.getName());
				
				main.put(jo);   //Put each JSON object to the JSON array object.
			}
			return Response.ok(main).header("Access-Control-Allow-Origin", "*")  
				.build();
		} catch (JSONException ex) {
			
		}
		return Response.serverError().build();
	}

	@GET
	@Path("/getSectionDates/{courseID}/{sectionID}")		/*This is the url of getting all previous lectures of a course.  */
	@Produces(MediaType.APPLICATION_JSON)
	public Response getDatesOfASection(@PathParam("courseID") String courseID, @PathParam("sectionID") String sectionID){
		try {
			JSONArray main = new JSONArray();		//A new JSON array object is created.
			List <String> dates = service.getDatesOfASection(courseID,sectionID); //Getting all dates of the course
			for(String date : dates){

				JSONObject jo = new JSONObject();   //A new JSON object for each course is create
				jo.accumulate("date", date); // Putting  dates

				main.put(jo);   //Put each JSON object to the JSON array object.
			}
			return Response.ok(main).header("Access-Control-Allow-Origin", "*")
					.build();
		} catch (JSONException ex) {
			ex.printStackTrace();
		}
		return Response.serverError().build();
	}


	@POST
	@Path("/add")   /*This is the url of the adding a new course to the system. When this url is called
					Course constructor is called and then a new course is created and put to the database.*/
	@Produces(MediaType.TEXT_PLAIN)
	public Response addCourse(@QueryParam("ID") String id,@QueryParam("name")String name) {
		//The parameters of the addCourse are;
		//id: id of the course who is going to be added.
		//name: name of the course who is going to be added.
		try{
			Course course=new Course(id, name); //The parameters of the constructor are the same as the parameters of the addCourse.
			service.addCourse(course);																   
			return Response.status(200).entity("success").build();	//It will return a success response if it is not failed.
		}
		catch(Exception ex){
			return Response.serverError().build();
		}

	}
	
	@DELETE
	@Path("/delete/{id}")		/*This is the url of the deleting a course from the system. When this url is called like http://localhost:8080/webapi/course/delete/1942085,
								it will delete the course from the database via REST service.*/
	@Produces(MediaType.TEXT_PLAIN)
	public Response deleteCourse(@PathParam("id") String id) {  //The function takes the id of the course who is going to be deleted.
		try{
			service.deleteCourse(id);		//This is the deletion of the course via REST service.
			return Response.status(200).entity("success").build(); 
		}
		catch(Exception ex){
			return Response.serverError().build();
		}
	}
	
	@PUT
	@Path("/update")
	@Produces(MediaType.TEXT_PLAIN)
	public Response updateCourse(@QueryParam("ID") String id,@QueryParam("name")String name) {
		//These parameters are the same as the addCourse.
		Course course = service.getCourse(id); //This gets the course who has the id in the parameter.
		Course cours=new Course(id, name);  //This is the same arguments as the addCourse function.
		try{
			service.updateCourse(cours);  //This updates the course's information.
			return Response.status(200).entity("success").build();   
		}
		catch(Exception ex){
			return Response.serverError().build();
		}
		
	}

	
}