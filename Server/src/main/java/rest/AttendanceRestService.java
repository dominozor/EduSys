package main.java.rest;

import javax.annotation.security.RolesAllowed;
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
import main.java.models.EduUser;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import main.java.service.Service;
import main.java.service.ServiceImpl;


@Path ("/attendance")
public class AttendanceRestService {

	Service service = new ServiceImpl().getInstance();


	@RolesAllowed({"ADMIN","LECTURER","STUDENT"})
	@GET 			/*This is the url of getting a attendance information. When this url is called like http://localhost:8080/webapi/attendance/get/1942085, the JSON object will be formed
					for the attendance information. Then the object is returned.*/
	@Path("/get/{ID}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAttendance(@PathParam("ID") String id) { //The parameter is the id of the attendance which comes from the url.
		try {


			JSONObject jo = new JSONObject();        //A new JSON object is created.
			Attendance attendance = service.getAttendance(id);   //Getting attendance information via REST service
			if (!(attendance == null)) {
				jo.accumulate("id", attendance.getId()); //Putting all information from service object to JSON object.
				jo.accumulate("sectionNo", attendance.getSectionNo());
				jo.accumulate("courseId", attendance.getCourseId());
				jo.accumulate("date", attendance.getDate());
			}


			return Response.ok(jo.toString()).header("Access-Control-Allow-Origin", "*")  //Then return the JSON object with a response.
					.build();
		} catch (JSONException ex) {

		}
		return Response.serverError().build();
	}

	@RolesAllowed({"ADMIN","LECTURER","STUDENT"})
	@GET
	@Path("/get")		/*This is the url of getting all attendance information. When this url is called like http://localhost:8080/webapi/attendance/get/, the JSON object will be formed
						for the attendance information. Then the object is returned.*/
	@Produces(MediaType.APPLICATION_JSON)
	public Response listAttendance() {
		try {
			JSONArray main = new JSONArray();        //A new JSON array object is created.
			List<Attendance> attendances = service.getAllAttendances(); //Getting all attendance information via REST service.
			for (Attendance attendance : attendances) {

				JSONObject jo = new JSONObject();   //A new JSON object for each attendance is created.
				jo.accumulate("id", attendance.getId()); //Putting all information from service object to JSON object.
				jo.accumulate("sectionNo", attendance.getSectionNo());
				jo.accumulate("courseId", attendance.getCourseId());
				jo.accumulate("date", attendance.getDate());

				main.put(jo);   //Put each JSON object to the JSON array object.
			}
			return Response.ok(main.toString()).header("Access-Control-Allow-Origin", "*")
					.build();
		} catch (JSONException ex) {

		}
		return Response.serverError().build();
	}


	@RolesAllowed({"ADMIN","LECTURER"})
	@DELETE
	@Path("/delete/{id}")		/*This is the url of the deleting an attendance from the system. When this url is called like http://localhost:8080/webapi/attendance/delete/1942085,
								it will delete the attendance from the database via REST service.*/
	@Produces(MediaType.TEXT_PLAIN)
	public Response deleteAttendance(@PathParam("id") String id) {  //The function takes the id of the attendance which is going to be deleted.
		try {
			service.deleteAttendance(id);        //This is the deletion of the course via REST service.
			return Response.status(200).entity("success").build();
		} catch (Exception ex) {
			return Response.serverError().build();
		}
	}

	@RolesAllowed({"ADMIN","LECTURER"})
	@DELETE
	@Path("/delete/{cid}/{sid}/{date}")		/*This is the url of the deleting an attendance from the system. When this url is called like http://localhost:8080/webapi/attendance/delete/1942085,
								it will delete the attendance from the database via REST service.*/
	@Produces(MediaType.TEXT_PLAIN)
	public Response deleteAttendanceFromDate(@PathParam("cid") String cid,@PathParam("sid") String sid,@PathParam("date") String date) {  //The function takes the id of the attendance which is going to be deleted.
		try {
			service.deleteAttendanceFromDate(cid,sid,date);        //This is the deletion of the course via REST service.
			return Response.status(200).entity("success").build();
		} catch (Exception ex) {
			return Response.serverError().build();
		}
	}


	//----------------------------------------------------------------\\
	//FUNCTIONS FOR GENERATING GENERAL INFORMATIONS

	@RolesAllowed({"ADMIN","LECTURER","STUDENT"})
	@GET
	@Path("/getAllAttendance/{ID}") /*This is the url of getting all attendance from the system. When this url is called like
									http://localhost:8080/webapi/attendance/getAllAttendance/1942085,
									it will get the attendance data from the database via REST service.*/
	@Produces(MediaType.APPLICATION_JSON)
	public Response listAttendanceForAStudent(@PathParam("ID") String id) { //The parameter which comes from the url is the id of the student
		//whose attendance data will be got.
		try {

			JSONArray main = new JSONArray();        //A new JSON array object is created.
			List<Attendance> attendances = service.listStudentAttendance(id); //Getting all attendance data via REST service.
			for (Attendance attendance : attendances) {

				JSONObject json = new JSONObject();   //A new JSON object for each attendance is created.
				json.accumulate("id", attendance.getId()); //Putting all information from service object to JSON object.
				json.accumulate("sectionNo", attendance.getSectionNo());
				json.accumulate("courseId", attendance.getCourseId());
				json.accumulate("date", attendance.getDate());

				main.put(json);   //Put each JSON object to the JSON array object.
			}
			return Response.ok(main.toString()).header("Access-Control-Allow-Origin", "*")
					.build();

		} catch (JSONException e) {
			e.printStackTrace();
		}

		return Response.serverError().build();
	}


	@RolesAllowed({"ADMIN","LECTURER","STUDENT"})
	@GET
	@Path("/getCourseAttendance/{ID}/{courseID}")/*This is the url of getting attendance data for a specific course from the system. When this url is
												called like http://localhost:8080/webapi/attendance/getCourseAttendance/1942085/graph,
												it will get the attendance data from the database via REST service.*/
	@Produces(MediaType.APPLICATION_JSON)
	//The parameters which come from the url are the id of the student whose attendance data will be got and the course name for which course
	//the attendance data will be got.
	public Response getCourseAttendanceForAStudent(@PathParam("ID") String id, @PathParam("courseID") String course) {

		try {

			JSONArray main = new JSONArray();        //A new JSON array object is created.
			List<Attendance> attendances = service.getStudentCourseAttendance(id, course); //Getting all attendance information via REST service.
			for (Attendance attendance : attendances) {

				JSONObject json = new JSONObject();   //A new JSON object for each attendance is created.
				json.accumulate("id", attendance.getId()); //Putting all information from service object to JSON object.
				json.accumulate("sectionNo", attendance.getSectionNo());
				json.accumulate("courseId", attendance.getCourseId());
				json.accumulate("date", attendance.getDate());

				main.put(json);   //Put each JSON object to the JSON array object.
			}
			return Response.ok(main.toString()).header("Access-Control-Allow-Origin", "*")
					.build();

		} catch (JSONException e) {
			e.printStackTrace();
		}

		return Response.serverError().build();
	}


	@RolesAllowed({"ADMIN","LECTURER","STUDENT"})
	@GET
	@Path("/getAllAttendance/{CourseID}/{UserID}")/*This is the url of getting attendance data for a specific course from the system. When this url is
												called like http://localhost:8080/webapi/attendance/getAllAttendance/1942085/graph,
												it will get the attendance data from the database via REST service.*/
	@Produces(MediaType.APPLICATION_JSON)
	//The parameters which come from the url are the id of the student whose attendance data will be got and the course name for which course
	//the attendance data will be got.
	public Response listAllStudentsAttendance(@PathParam("CourseID") String course, @PathParam("UserID") String userID) {

		try {

			JSONArray main = new JSONArray();        //A new JSON array object is created.
			List<Object[]> attendances = service.getAllStudentsAttendance(course, userID); //Getting all attendance information via REST service.
			for (Object[] attendance : attendances) {

				JSONObject json = new JSONObject();   //A new JSON object for each attendance is created.
				json.accumulate("id", attendance[0]); //Putting all information from service object to JSON object.
				json.accumulate("date", attendance[1]);
				json.accumulate("userID", attendance[2]);

				main.put(json);   //Put each JSON object to the JSON array object.
			}
			return Response.ok(main.toString()).header("Access-Control-Allow-Origin", "*")
					.build();

		} catch (JSONException e) {
			e.printStackTrace();
		}

		return Response.serverError().build();
	}


	@RolesAllowed({"ADMIN","LECTURER","STUDENT"})
	@GET
	@Path("/getAttendanceFromDate/{courseID}/{sectionID}/{date}")/*This is the url of getting attendance data for a specific course from the system. When this url is
												called like http://localhost:8080/templates/date/student-list.html,
												it will get the attendance data from the database via REST service.*/
	@Produces(MediaType.APPLICATION_JSON)

	public Response getCourseAttendanceForADate(@PathParam("courseID") String courseid, @PathParam("sectionID") String sectionid, @PathParam("date") String date) {

		try {

			JSONArray main = new JSONArray();        //A new JSON array object is created.
			List<Object[]> attendances = service.getStudentCourseAttendanceDate(courseid, sectionid, date); //Getting all attendance information via REST service.
			for (Object[] attendance : attendances) {

				JSONObject json = new JSONObject();   //A new JSON object for each attendance is created.
				json.accumulate("id", attendance[0]); //Putting all information from service object to JSON object.
				json.accumulate("name", attendance[1]);
				json.accumulate("surname", attendance[2]);
				json.accumulate("distance", attendance[3]);
				json.accumulate("topcoor", attendance[4]);
				json.accumulate("bottomcoor", attendance[5]);
				json.accumulate("leftcoor", attendance[6]);
				json.accumulate("rightcoor", attendance[7]);

				main.put(json);   //Put each JSON object to the JSON array object.
			}
			return Response.ok(main.toString()).header("Access-Control-Allow-Origin", "*")
					.build();

		} catch (JSONException e) {
			e.printStackTrace();
		}

		return Response.serverError().build();
	}



	@GET
	@Path("/getInterestForAttendance/{userID}/{attendanceID}")/*This is the url of getting interest data for a specific attendance from the system. When this url is
												called like http://localhost:8080/rest/attendance/getInterestForAttendance/1942085/JM8OPTI4HY,
												it will get the interest data from the database via REST service.*/
	@Produces(MediaType.APPLICATION_JSON)

	public Response getInterestForAttendance(@PathParam("userID") String userid, @PathParam("attendanceID") String attendanceid) {

		try {

			JSONArray main = new JSONArray();        //A new JSON array object is created.
			List<Object[]> interests = service.getInterestForAttendance(userid, attendanceid); //Getting all interest information via REST service.
			for (Object[] interest : interests) {

				JSONObject json = new JSONObject();   //A new JSON object for each attendance is created.
				json.accumulate("distance", interest[0]); //Putting all information from service object to JSON object.
				json.accumulate("topcoor", interest[1]);
				json.accumulate("bottomcoor", interest[2]);
				json.accumulate("rightcoor", interest[3]);
				json.accumulate("leftcoor", interest[4]);


				main.put(json);   //Put each JSON object to the JSON array object.
			}
			return Response.ok(main.toString()).header("Access-Control-Allow-Origin", "*")
					.build();

		} catch (JSONException e) {
			e.printStackTrace();
		}

		return Response.serverError().build();
	}


	@RolesAllowed({"ADMIN","LECTURER","STUDENT"})
	@GET
	@Path("/getAttendanceNumber/{courseID}/{sectionNo}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAttendanceNumber(@PathParam("courseID") String courseID, @PathParam("sectionNo") String sectionNo ) {

		try{

			JSONArray main = new JSONArray();        //A new JSON array object is created.
			int attendanceNumber = service.getNumberOfAttendance(courseID,sectionNo);
			System.out.println(attendanceNumber);
			JSONObject json = new JSONObject();   //A new JSON object for each attendance is created.
			json.accumulate("attendanceNumber", attendanceNumber); //Putting all information from service object to JSON object.

			main.put(json);
			return Response.ok(main.toString()).header("Access-Control-Allow-Origin", "*")
					.build();
		}
		catch(Exception ex){
			ex.printStackTrace();
		}

		return Response.serverError().build();

	}


	@RolesAllowed({"ADMIN","LECTURER","STUDENT"})
	@GET
	@Path("/getAvgInterest/{courseID}/{sectionNo}/{userID}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAverageInterest(@PathParam("courseID") String courseID, @PathParam("sectionNo") String sectionNo, @PathParam("userID") String userID ) {

		try{

			JSONArray main = new JSONArray();        //A new JSON array object is created.
			List<Object[]> averageInterest = service.getAverageInterestInfo(courseID, sectionNo, userID);
			//System.out.println(averageInterest.size());
			JSONObject json = new JSONObject();   //A new JSON object for each attendance is created.
			double distance=0.0;
			double topcoor = 0.0;
			double bottomcoor=0.0;
			double rightcoor = 0.0;
			double leftcoor = 0.0;

			for(Object[] avgInt : averageInterest) {

				distance += Double.valueOf(String.valueOf(avgInt[0]));
				topcoor += Double.valueOf(String.valueOf(avgInt[1]));
				bottomcoor += Double.valueOf(String.valueOf(avgInt[2]));
				rightcoor += Double.valueOf(String.valueOf(avgInt[3]));
				leftcoor += Double.valueOf(String.valueOf(avgInt[4]));

			}

			double size = Double.valueOf(averageInterest.size());

			distance /= size;
			topcoor /= size;
			bottomcoor /= size;
			rightcoor /= size;
			leftcoor /= size;


			json.accumulate("distance", String.valueOf(distance));
			json.accumulate("topcoor", String.valueOf(topcoor));
			json.accumulate("bottomcoor", String.valueOf(bottomcoor));
			json.accumulate("rightcoor", String.valueOf(rightcoor));
			json.accumulate("leftcoor", String.valueOf(leftcoor));

			main.put(json);

			return Response.ok(main.toString()).header("Access-Control-Allow-Origin", "*")
					.build();
		}
		catch(Exception ex){
			ex.printStackTrace();
		}

		return Response.serverError().build();
	}


	@RolesAllowed({"ADMIN","LECTURER","STUDENT"})
	@GET
	@Path("/listAvgInterests/{UserID}")		/*This is the url of getting an exam grade and type of a student for a specific course.
									This url is called like http://localhost:8080/rest/user/getExamGrade/{ID}/{CourseID}, the JSON object will be formed
									for the courses of the student with given id. Then the object is returned.*/
	@Produces(MediaType.APPLICATION_JSON)
	public Response listAverageInterestInfo( @PathParam("UserID") String userID){
		try {
			JSONArray main = new JSONArray();		//A new JSON array object is created.
			List <Object[]> interests = service.listAverageInterestInfo( userID); //Getting an exam grade and type of student with given id.

			for(Object[] interest : interests){

				JSONObject jo = new JSONObject();   //A new JSON object for each course is create
				jo.accumulate("courseId", interest[0]);
				jo.accumulate("distance", interest[1]); //Putting all information from service object to JSON object.
				jo.accumulate("topcoor", interest[2]);
				jo.accumulate("bottomcoor", interest[3]);
				jo.accumulate("rightcoor", interest[4]);
				jo.accumulate("leftcoor", interest[5]);

				main.put(jo);   //Put each JSON object to the JSON array object.
			}
			return Response.ok(main.toString()).header("Access-Control-Allow-Origin", "*")
					.build();
		} catch (JSONException ex) {
			ex.printStackTrace();
		}
		return Response.serverError().build();
	}

	@RolesAllowed({"ADMIN","LECTURER"})
	@GET
	@Path("/getAttendancePercentageForLecturer/{UserID}")		/*This is the url of getting an exam grade and type of a student for a specific course.
									This url is called like http://localhost:8080/rest/user/getExamGrade/{ID}/{CourseID}, the JSON object will be formed
									for the courses of the student with given id. Then the object is returned.*/
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAttendancePercentageForLecturer( @PathParam("UserID") String userID){
		try {
			JSONArray main = new JSONArray();		//A new JSON array object is created.
			List <Object[]> percentages = service.getAttendancePercentageForLecturer(userID); //Getting an exam grade and type of student with given id.

			for(Object[] percentage : percentages){

				JSONObject jo = new JSONObject();   //A new JSON object for each course is create
				jo.accumulate("courseid", percentage[0]);
				jo.accumulate("sectionno", percentage[1]); //Putting all information from service object to JSON object.
				jo.accumulate("totalstu", percentage[2]);
				jo.accumulate("mult", percentage[3]);

				main.put(jo);   //Put each JSON object to the JSON array object.
			}
			return Response.ok(main.toString()).header("Access-Control-Allow-Origin", "*")
					.build();
		} catch (JSONException ex) {
			ex.printStackTrace();
		}
		return Response.serverError().build();
	}


	@RolesAllowed({"ADMIN","LECTURER"})
	@GET
	@Path("/getTotalAttendanceRateForSection/{courseID}/{sectionID}")		/*This is the url of getting an exam grade and type of a student for a specific course.
									This url is called like http://localhost:8080/rest/user/getExamGrade/{ID}/{CourseID}, the JSON object will be formed
									for the courses of the student with given id. Then the object is returned.*/
	@Produces(MediaType.APPLICATION_JSON)
	public Response getTotalAttendanceRateForSection( @PathParam("courseID") String courseID , @PathParam("sectionID") String sectionID){
		try {
			JSONArray main = new JSONArray();		//A new JSON array object is created.
			List <Object[]> percentages = service.getTotalAttendanceRateForSection(courseID,sectionID); //Getting an exam grade and type of student with given id.

			for(Object[] percentage : percentages){

				JSONObject jo = new JSONObject();   //A new JSON object for each course is create
				jo.accumulate("totalstu", percentage[0]);
				jo.accumulate("mult", percentage[1]); //Putting all information from service object to JSON object.


				main.put(jo);   //Put each JSON object to the JSON array object.
			}
			return Response.ok(main.toString()).header("Access-Control-Allow-Origin", "*")
					.build();
		} catch (JSONException ex) {
			ex.printStackTrace();
		}
		return Response.serverError().build();
	}




	@RolesAllowed({"ADMIN","LECTURER"})
	@GET
	@Path("/getAttendancePercentageForLecturerPerDay/{UserID}")		/*This is the url of getting an exam grade and type of a student for a specific course.
									This url is called like http://localhost:8080/rest/user/getExamGrade/{ID}/{CourseID}, the JSON object will be formed
									for the courses of the student with given id. Then the object is returned.*/
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAttendancePercentageForLecturerPerDay( @PathParam("UserID") String userID){
		try {
			JSONArray main = new JSONArray();		//A new JSON array object is created.
			List <Object[]> percentages = service.getAttendancePercentageForLecturerPerDay(userID); //Getting an exam grade and type of student with given id.
            System.out.println("ui =" + userID);
			for(Object[] percentage : percentages){

				JSONObject jo = new JSONObject();   //A new JSON object for each course is create
				jo.accumulate("courseid", percentage[0]);
				jo.accumulate("sectionno", percentage[1]); //Putting all information from service object to JSON object.
				jo.accumulate("date", percentage[2]);
				jo.accumulate("totalAtt", percentage[3]);
				jo.accumulate("totalCapacity", percentage[4]);


				main.put(jo);   //Put each JSON object to the JSON array object.
			}
			return Response.ok(main.toString()).header("Access-Control-Allow-Origin", "*")
					.build();
		} catch (JSONException ex) {
			ex.printStackTrace();
		}
		return Response.serverError().build();
	}







	@RolesAllowed({"ADMIN","LECTURER","STUDENT"})
	@GET
	@Path("/getInterestInfo/{UserID}")		/*This is the url of getting an exam grade and type of a student for a specific course.
									This url is called like http://localhost:8080/rest/user/getExamGrade/{ID}/{CourseID}, the JSON object will be formed
									for the courses of the student with given id. Then the object is returned.*/
	@Produces(MediaType.APPLICATION_JSON)
	public Response getInterestInfoOfCourses( @PathParam("UserID") String userID){
		try {
			JSONArray main = new JSONArray();		//A new JSON array object is created.
			List <Object[]> interests = service.getInterestInfoOfCourses( userID); //Getting an exam grade and type of student with given id.

			for(Object[] interest : interests){

				JSONObject jo = new JSONObject();   //A new JSON object for each course is create
				jo.accumulate("courseId", interest[0]);
				jo.accumulate("sectionId", interest[1]);
				jo.accumulate("date", interest[2]);
				jo.accumulate("distance", interest[3]); //Putting all information from service object to JSON object.
				jo.accumulate("bottomcoor", interest[4]);
				jo.accumulate("topcoor", interest[5]);
				jo.accumulate("leftcoor", interest[6]);
				jo.accumulate("rightcoor", interest[7]);

				main.put(jo);   //Put each JSON object to the JSON array object.
			}
			return Response.ok(main.toString()).header("Access-Control-Allow-Origin", "*")
					.build();
		} catch (JSONException ex) {
			ex.printStackTrace();
		}
		return Response.serverError().build();
	}

	@RolesAllowed({"ADMIN","LECTURER"})
	@GET
	@Path("/getSeatingPercentageForCourse/{CourseID}/{SectionID}")		/*This is the url of getting an exam grade and type of a student for a specific course.
									This url is called like http://localhost:8080/rest/user/getExamGrade/{ID}/{CourseID}, the JSON object will be formed
									for the courses of the student with given id. Then the object is returned.*/
	@Produces(MediaType.APPLICATION_JSON)
	public Response getSeatingPercentageForCourse( @PathParam("CourseID") String courseID, @PathParam("SectionID") String sectionID){
		try {
			JSONArray main = new JSONArray();		//A new JSON array object is created.
			List <Object[]> seats = service.getSeatingPercentageForCourse(courseID, sectionID); //Getting an exam grade and type of student with given id.
			for(Object seat : seats){

				JSONObject jo = new JSONObject();   //A new JSON object for each course is create
				jo.accumulate("distance", seat.toString());
				main.put(jo);   //Put each JSON object to the JSON array object.
			}
			return Response.ok(main.toString()).header("Access-Control-Allow-Origin", "*")
					.build();
		} catch (JSONException ex) {
			ex.printStackTrace();
		}
		return Response.serverError().build();
	}


	@RolesAllowed({"ADMIN","LECTURER", "STUDENT"})
	@GET
	@Path("/getAllAttendanceNumbers/{userID}")		/*This is the url of getting an exam grade and type of a student for a specific course.
									This url is called like http://localhost:8080/rest/user/getExamGrade/{ID}/{CourseID}, the JSON object will be formed
									for the courses of the student with given id. Then the object is returned.*/
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllAttendanceNumbersForStudent( @PathParam("userID") String userID){
		try {
			List <Object[]> attendanceCounts = service.getAllAttendanceCountsOfStudents(userID); //Getting an exam grade and type of student with given id.

			JSONArray main = new JSONArray();
			for(Object[] attCount : attendanceCounts){

				JSONObject jo = new JSONObject();   //A new JSON object for each course is create
				jo.accumulate("courseID", attCount[0]);
				jo.accumulate("attendanceCount", attCount[1]);

				main.put(jo);
			}
			return Response.ok(main.toString()).header("Access-Control-Allow-Origin", "*")
					.build();
		} catch (JSONException ex) {
			ex.printStackTrace();
		}
		return Response.serverError().build();
	}


	@RolesAllowed({"ADMIN","LECTURER", "STUDENT"})
	@GET
	@Path("/getAllAttendanceNumbersForCourse/{userID}")		/*This is the url of getting an exam grade and type of a student for a specific course.
									This url is called like http://localhost:8080/rest/user/getExamGrade/{ID}/{CourseID}, the JSON object will be formed
									for the courses of the student with given id. Then the object is returned.*/
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllAttendanceNumbersForCourse( @PathParam("userID") String userID){
		try {
			List <Object[]> attendanceCounts = service.getAllAttendanceCountsOfCourses(userID); //Getting an exam grade and type of student with given id.

			JSONArray main = new JSONArray();
			for(Object[] attCount : attendanceCounts){

				JSONObject jo = new JSONObject();   //A new JSON object for each course is create
				jo.accumulate("courseID", attCount[0]);
				jo.accumulate("sectionID", attCount[1]);
				jo.accumulate("attendanceCount", attCount[2]);

				main.put(jo);
			}
			return Response.ok(main.toString()).header("Access-Control-Allow-Origin", "*")
					.build();
		} catch (JSONException ex) {
			ex.printStackTrace();
		}
		return Response.serverError().build();
	}

	////degisiklik

	@RolesAllowed({"ADMIN","LECTURER", "STUDENT"})
	@GET
	@Path("/getAllSeatingsForLecturer/{userID}")		/*This is the url of getting an exam grade and type of a student for a specific course.
									This url is called like http://localhost:8080/rest/user/getExamGrade/{ID}/{CourseID}, the JSON object will be formed
									for the courses of the student with given id. Then the object is returned.*/
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllSeatingsForLecturer( @PathParam("userID") String userID){
		try {
			List <Object[]> seatingPlaces = service.getAllSeatingsForLecturer(userID); //Getting an exam grade and type of student with given id.

			JSONArray main = new JSONArray();
			for(Object[] seat : seatingPlaces){

				JSONObject jo = new JSONObject();   //A new JSON object for each course is create
				jo.accumulate("distance", seat[0]);
				jo.accumulate("topcoor", seat[1]);
				jo.accumulate("bottomcoor", seat[2]);
				jo.accumulate("leftcoor", seat[3]);
				jo.accumulate("rightcoor", seat[4]);


				main.put(jo);
			}
			return Response.ok(main.toString()).header("Access-Control-Allow-Origin", "*")
					.build();
		} catch (JSONException ex) {
			ex.printStackTrace();
		}
		return Response.serverError().build();
	}


	@RolesAllowed({"ADMIN","LECTURER", "STUDENT"})
	@GET
	@Path("/getAllSeatingsForLecturerCourse/{userID}/{sectionID}/{courseID}")		/*This is the url of getting an exam grade and type of a student for a specific course.
									This url is called like http://localhost:8080/rest/user/getExamGrade/{ID}/{CourseID}, the JSON object will be formed
									for the courses of the student with given id. Then the object is returned.*/
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllSeatingsForLecturerCourse( @PathParam("userID") String userID, @PathParam("sectionID") String sectionID, @PathParam("courseID") String courseID){
		try {
			List <Object[]> seatingPlaces = service.getAllSeatingsForLecturerCourse(userID,sectionID,courseID); //Getting an exam grade and type of student with given id.

			JSONArray main = new JSONArray();
			for(Object[] seat : seatingPlaces){

				JSONObject jo = new JSONObject();   //A new JSON object for each course is create
				jo.accumulate("distance", seat[0]);
				jo.accumulate("topcoor", seat[1]);
				jo.accumulate("bottomcoor", seat[2]);
				jo.accumulate("leftcoor", seat[3]);
				jo.accumulate("rightcoor", seat[4]);


				main.put(jo);
			}
			return Response.ok(main.toString()).header("Access-Control-Allow-Origin", "*")
					.build();
		} catch (JSONException ex) {
			ex.printStackTrace();
		}
		return Response.serverError().build();
	}

	///degisiklik

}