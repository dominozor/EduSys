package main.java.rest;

import main.java.models.Exam;
import main.java.models.Section;
import main.java.service.Service;
import main.java.service.ServiceImpl;
import main.java.utility.CameraUtility;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

/**
 * Created by Enver.
 */
@Path("/section")
public class SectionRestService {
    Service service = new ServiceImpl().getInstance();
    CameraUtility cameraUtility = new CameraUtility();

    @GET
    @Path("/test")
    public String test(){
        return "test...";
    }

    @RolesAllowed({"ADMIN","LECTURER","STUDENT"})
    @GET
    @Path("/get/{course}/{section}")
    @Produces(MediaType.APPLICATION_JSON)
    //The parameters of the getSection are;
    //course: course id of the exam which is going to be got.
    //section: section number of the exam which is going to be got.
    public Response getSection(@PathParam("course")String course_id, @PathParam("section") int section_no){
        try {

            JSONObject jo = new JSONObject();
            Section section = service.getSection(course_id,section_no);
            if(!(section==null)){
                jo.accumulate("course_id", section.getCourseID());
                jo.accumulate("section_no", section.getSectionNo());
                jo.accumulate("user_id",section.getUserID());
                jo.accumulate("number_of_students", section.getNumber_of_students());
                jo.accumulate("number_of_lectures", section.getNumber_of_lectures());
                jo.accumulate("exam_percentage", section.getExam_percentage());
                jo.accumulate("seating_place_percentage", section.getSeating_place_percentage());
                jo.accumulate("attendance_percentage", section.getAttendance_percentage());

            }

            return Response.ok(jo.toString()).header("Access-Control-Allow-Origin", "*")
                    .build();
        } catch (JSONException ex) {

        }
        return Response.serverError().build();
    }

    @RolesAllowed({"ADMIN","LECTURER","STUDENT"})
    @GET
    @Path("/get")
    @Produces(MediaType.APPLICATION_JSON)
    //This function gets the list of section from the database.
    public Response listSection(){
        try {
            JSONArray main = new JSONArray();
            List<Section> sections = service.getAllSections();
            for(Section section : sections){

                JSONObject jo = new JSONObject();
                jo.accumulate("course_id", section.getCourseID());
                jo.accumulate("section_no", section.getSectionNo());
                jo.accumulate("user_id",section.getUserID());
                jo.accumulate("number_of_students", section.getNumber_of_students());
                jo.accumulate("number_of_lectures", section.getNumber_of_lectures());
                jo.accumulate("exam_percentage", section.getExam_percentage());
                jo.accumulate("seating_place_percentage", section.getSeating_place_percentage());
                jo.accumulate("attendance_percentage", section.getAttendance_percentage());

                main.put(jo);
            }
            return Response.ok(main.toString()).header("Access-Control-Allow-Origin", "*")
                    .build();
        } catch (JSONException ex) {

        }
        return Response.serverError().build();
    }

    @RolesAllowed({"ADMIN","LECTURER"})
    @POST
    @Path("/add")
    @Produces(MediaType.TEXT_PLAIN)
    //The parameters of the addSection are;
    //course: course id of the section which is going to be added.
    //section: section number of the section which is going to be added.
    //user_id: user id of the section which is going to be added.
    //number_of_students: number of students of the section which is going to be added.
    //number_of_lectures: number of lectures of the section which is going to be added.
    public Response addSection(@QueryParam("course")String course_id, @QueryParam("section") int section_no,@QueryParam("user_id") String user_id,@QueryParam("number_of_students") int number_of_students, @QueryParam("number_of_lectures") int number_of_lectures, @QueryParam("exam_percentage") int exam_percentage, @QueryParam("seating_place_percentage") int seating_plage_percentage, @QueryParam("attendance_percentage") int attendance_percentage ) {

        try{

            Section section=new Section(course_id, section_no, user_id, number_of_students, number_of_lectures, exam_percentage, seating_plage_percentage, attendance_percentage);
            service.addSection(section);

            return Response.status(200).entity("success").build();
        }
        catch(Exception ex){
            return Response.serverError().build();
        }

    }

    @RolesAllowed({"ADMIN","LECTURER"})
    @DELETE
    @Path("/delete/{course}/{section}")
    @Produces(MediaType.TEXT_PLAIN)
    //The parameters of the deleteSection are;
    //course: course id of the section which is going to be deleted.
    //section: section number of the section which is going to be deleted.
    public Response deleteSection(@PathParam("course") String course_id, @PathParam("section") int section_id ) {
        try{
            service.deleteSection(course_id, section_id);
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
    //The parameters of the updateSection are;
    //course: course id of the section which is going to be updated.
    //section: section number of the section which is going to be updated.
    //user_id: user id of the section which is going to be updated.
    //number_of_students: number of students of the section which is going to be updated.
    //number_of_lectures: number of lectures of the section which is going to be updated.
    public Response updateSection(@QueryParam("course")String course_id, @QueryParam("section") int section_no,@QueryParam("user_id") String user_id,@QueryParam("number_of_students") int number_of_students, @QueryParam("number_of_lectures") int number_of_lectures, @QueryParam("exam_percentage") int exam_percentage, @QueryParam("seating_place_percentage") int seating_plage_percentage, @QueryParam("attendance_percentage") int attendance_percentage ) {

        try{
            Section section = service.getSection(course_id,section_no);
            section=new Section(section.getCourseID(), section.getSectionNo(), user_id, number_of_students, number_of_lectures, exam_percentage, seating_plage_percentage, attendance_percentage);
            service.updateSection(section);

            return Response.status(200).entity("success").build();
        }
        catch(Exception ex){
            return Response.serverError().build();
        }

    }

    @RolesAllowed("LECTURER")
    @POST
    @Path("/takeAttendance/{course}/{section}")
    @Produces(MediaType.TEXT_PLAIN)
    public Response takeAttendance(@PathParam("course") String course_id, @PathParam("section") int section_id ) {
        try{
            cameraUtility.takeAttendance(course_id, section_id);
            return Response.status(200).entity("Attendance has been taken successfully!").build();
        }
        catch(Exception ex){
            return Response.serverError().build();
        }
    }

    @RolesAllowed("LECTURER")
    @POST
    @Path("/firstLesson/{course}/{section}")
    @Produces(MediaType.TEXT_PLAIN)
    public Response firstLesson(@PathParam("course") String course_id, @PathParam("section") int section_id ) {
        try{
            cameraUtility.firstLesson();
            return Response.status(200).entity("First Lesson Training has successfully completed!").build();
        }
        catch(Exception ex){
            return Response.serverError().build();
        }
    }

}
