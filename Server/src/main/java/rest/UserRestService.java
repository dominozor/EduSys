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
import main.java.models.EduUser;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import main.java.service.Service;
import main.java.service.ServiceImpl;


@Path ("/user")
public class UserRestService {	
	
	Service service = new ServiceImpl().getInstance();

	@GET
	@Path("/test")
	public String test(){
		return "test...";
	}

	@GET 			/*This is the url of getting a person's information. When this url is called like http://localhost:8080/webapi/user/get/1942085, the JSON object will be formed 
					for the information of the person who has the id. Then the object is returned.*/
	@Path("/get/{ID}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getPerson(@PathParam("ID") String id){ //The parameter is the id of the person which comes from the url.
		try {
			
			
			JSONObject jo = new JSONObject();		//A new JSON object is created.
			EduUser user = service.getPerson(id);   //Getting user information via REST service
			if(!(user==null)){
				jo.accumulate("id", user.getUsername()); //Putting all information from service object to JSON object.
				jo.accumulate("name", user.getName());
				jo.accumulate("surname", user.getSurname());
				jo.accumulate("email", user.getEmail());
				jo.accumulate("ppic", user.getProfilePic());
				jo.accumulate("role", user.getRole());
			}
			
			
			return Response.ok(jo).header("Access-Control-Allow-Origin", "*")  //Then return the JSON object with a response.
				.build();
		} catch (JSONException ex) {
			
		}
		return Response.serverError().build();
	}
	
	@GET
	@Path("/get")		/*This is the url of getting all people's information. When this url is called like http://localhost:8080/webapi/user/get/, the JSON object will be formed 
						for the information of the all people's. Then the object is returned.*/
	@Produces(MediaType.APPLICATION_JSON)
	public Response listPerson(){
		try {
			JSONArray main = new JSONArray();		//A new JSON array object is created.
			List <EduUser> users = service.getAllPeople(); //Getting all user information via REST service.
			for(EduUser user : users){
				
				JSONObject jo = new JSONObject();   //A new JSON object for each person is created.
				jo.accumulate("id", user.getUsername());  //Putting all information from service object to JSON object.
				jo.accumulate("name", user.getName());
				jo.accumulate("surname", user.getSurname());
				jo.accumulate("email", user.getEmail());
				jo.accumulate("ppic", user.getProfilePic());
				jo.accumulate("role", user.getRole());
				
				main.put(jo);   //Put each JSON object to the JSON array object.
			}
			return Response.ok(main).header("Access-Control-Allow-Origin", "*")  
				.build();
		} catch (JSONException ex) {
			
		}
		return Response.serverError().build();
	}
	
	@POST
	@Path("/add")   /*This is the url of the adding a new person to the system. When this url is called like 
					http://localhost:8080/webapi/user/add?ID=domi&name=Enver&surname=Evci&email=enverevci@gmail.com&password=123&ppicLink=link-to-pic&scope=0,
					EduUser constructor is called and then a new person is created and put to the database.*/
	@Produces(MediaType.TEXT_PLAIN)
	public Response addPerson(@QueryParam("ID") String id,@QueryParam("name")String name, @QueryParam("surname") String surname,@QueryParam("email") String email,@QueryParam("password") String password,@QueryParam("ppicLink") String ppicLink,@QueryParam("role") int role) {
		//The parameters of the addPerson are;
		//id: id of the person who is going to be added.
		//name: name of the person who is going to be added.
		//surname: surname of the person who is going to be added.
		//email: email of the person who is going to be added.
		//password: password of the person who is going to be added.
		//ppiclink: profile picture link of the person who is going to be added. If a person wants to add profile picture, the link of it will be saved in the database.
		//role: this is the role of the person. The person may be a student or may be a lecturer. 
		try{
			EduUser person=new EduUser(id, name, surname, email, password, null, ppicLink, role); //The parameters of the constructure is the same as the parameters of the addPerson
			service.addPerson(person);																  //function. the null parameter is the link of the traihned photographs of the student.
																									  //At the beginnig it is null. The digstedPass parameter is the encripted version of the
																									  //password of the person. 
			return Response.status(200).entity("success").build();	//It will return a success response if it is not failed.
		}
		catch(Exception ex){
			return Response.serverError().build();
		}

	}
	
	@DELETE
	@Path("/delete/{id}")		/*This is the url of the adding a new person to the system. When this url is called like http://localhost:8080/webapi/user/delete/1942085,
								it will delete the person from the database via REST service.*/
	@Produces(MediaType.TEXT_PLAIN)
	public Response deletePerson(@PathParam("id") String id) {  //The function takes the id of the person who is going to be deleted.
		try{
			service.deletePerson(id);		//This is the deletion of the person via REST service.
			return Response.status(200).entity("success").build(); 
		}
		catch(Exception ex){
			return Response.serverError().build();
		}
	}
	
	@PUT
	@Path("/update")
	@Produces(MediaType.TEXT_PLAIN)
	public Response updatePerson(@QueryParam("ID") String id,@QueryParam("name")String name, @QueryParam("surname") String surname,@QueryParam("email") String email,@QueryParam("ppicLink") String ppicLink,@QueryParam("role") int role) {
		//These parameters are the same as the addPerson.
		EduUser user = service.getPerson(id); //This gets the person who has the id in the parameter.
		EduUser person=new EduUser(id, name, surname, email, user.getPassword(), user.getTrainLink(), user.getProfilePic(), role);  //This is the same arguments as the addPerson function. Only difference
																												  //is this has the real link of the trained photo.
		try{
			service.updatePerson(person);  //This updates the person's information.
			return Response.status(200).entity("success").build();   
		}
		catch(Exception ex){
			return Response.serverError().build();
		}
		
	}

	
	
	@POST
	@Path("/login")
	@Produces(MediaType.TEXT_PLAIN)
	public Response login(@QueryParam("ID") String id,@QueryParam("password") String pass){
		try{

			EduUser person=service.getPerson(id);

			//Normally passwords are going to be encrypted in JavaScript part
			//String digestedPass = org.apache.commons.codec.digest.DigestUtils.sha256Hex(pass);

			if(pass.equals(person.getPassword())){
				//JavaScript part of the project will take that and redirect it to either Admin page or User page.
				if(person.getRole()==0){ // if user is admin
					return Response.status(200).entity("0").build(); 
				}
				else if(person.getRole()==1){ //if user is lecturer
					return Response.status(200).entity("1").build();
				}
				else if(person.getRole()==2){ //if user is student
					return Response.status(200).entity("2").build();
				}
			}
			else{ // if password is wrong
				return Response.status(404).entity("e1").build();
			}

		}
		catch(Exception ex){
			return Response.status(404).entity("e2").build();
		}
		return Response.status(404).entity("e2").build();
	}


	@GET
	@Path("/getStudentCourses/{ID}")		/*This is the url of getting all courses of a student. When this url is called like http://localhost:8080/webapi/user/getStudentCourses/, the JSON object will be formed
						for the courses of the student with given id. Then the object is returned.*/
	@Produces(MediaType.APPLICATION_JSON)
	public Response listCoursesOfAStudent(@PathParam("ID") String id){
		try {
			JSONArray main = new JSONArray();		//A new JSON array object is created.
			List <Object[]> courses = service.getAllCoursesOfAStudent(id); //Getting all courses of student with given id.
            System.out.println();
            for(Object[] course : courses){

                JSONObject jo = new JSONObject();   //A new JSON object for each course is create
                jo.accumulate("name", course[1]); // Putting name of courses

                main.put(jo);   //Put each JSON object to the JSON array object.
            }
            return Response.ok(main).header("Access-Control-Allow-Origin", "*")
                    .build();
        } catch (JSONException ex) {
            ex.printStackTrace();
        }
        return Response.serverError().build();
	}

	@GET
	@Path("/getLecturerCourses/{ID}")		/*This is the url of getting all courses of a lecturer. This url is called like http://localhost:8080/webapi/user/getLecturerCourses/, the JSON object will be formed
						for the courses of the lecturer with given id. Then the object is returned.*/
	@Produces(MediaType.APPLICATION_JSON)
	public Response listCoursesOfALecturer(@PathParam("ID") String id){
		try {
			JSONArray main = new JSONArray();		//A new JSON array object is created.
			List <Object[]> courses = service.getAllCoursesOfALecturer(id); //Getting all courses of lecturer with given id.
			System.out.println();
			for(Object[] course : courses){

				JSONObject jo = new JSONObject();   //A new JSON object for each course is create
				jo.accumulate("id", course[0]); // Putting id of courses
				jo.accumulate("name", course[1]); // Putting name of courses

				main.put(jo);   //Put each JSON object to the JSON array object.
			}
			return Response.ok(main).header("Access-Control-Allow-Origin", "*")
					.build();
		} catch (JSONException ex) {
			ex.printStackTrace();
		}
		return Response.serverError().build();
	}


}


