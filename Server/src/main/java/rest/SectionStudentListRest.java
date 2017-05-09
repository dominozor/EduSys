package main.java.rest;

import main.java.models.SectionStudentList;
import main.java.service.Service;
import main.java.service.ServiceImpl;
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
@Path("/sectionStudentList")
public class SectionStudentListRest {

    Service service = new ServiceImpl().getInstance();

    @GET
    @Path("/test")
    public String test(){
        return "test...";
    }

    @RolesAllowed({"ADMIN","LECTURER","STUDENT"})
    @GET
    @Path("/get/{course}/{section}/{user_id}")
    @Produces(MediaType.APPLICATION_JSON)
    //The parameters of the getSectionStudentList are;
    //course: course id of the section student list which is going to be added.
    //section: section number of the section student list which is going to be added.
    //user_id: user id of the section student list which is going to be added.
    public Response getSectionStudentList(@PathParam("course")String courseID, @PathParam("section")int sectionNo, @PathParam("user_id") String userID){
        try {

            JSONObject jo = new JSONObject();
            SectionStudentList sectionList = service.getSectionStudentList(courseID, sectionNo, userID);
            if(!(sectionList==null)){
                jo.accumulate("course_id", sectionList.getCourseID());
                jo.accumulate("section_no", sectionList.getSectionNo());
                jo.accumulate("user_id", sectionList.getUserID());
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
    public Response listSectionStudentList(){
        try {
            JSONArray main = new JSONArray();
            List<SectionStudentList> sectionLists = service.getAllSectionStudentLists();
            for(SectionStudentList sectionList : sectionLists){

                JSONObject jo = new JSONObject();
                jo.accumulate("course_id", sectionList.getCourseID());
                jo.accumulate("section_no", sectionList.getSectionNo());
                jo.accumulate("user_id",sectionList.getUserID());

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
    //The parameters of the addSectionStudentList are;
    //course: course id of the section student list which is going to be added.
    //section: section number of the section student list which is going to be added.
    //user_id: user id of the section student list which is going to be added.
    public Response addSectionStudentList(@QueryParam("course")String course_id, @QueryParam("section") int section_no,@QueryParam("user_id") String user_id ) {

        try{

            SectionStudentList sectionStudentList=new SectionStudentList(course_id, section_no, user_id);
            service.addSectionStudentList(sectionStudentList);

            return Response.status(200).entity("success").build();
        }
        catch(Exception ex){
            return Response.serverError().build();
        }

    }

    @RolesAllowed({"ADMIN","LECTURER"})
    @DELETE
    @Path("/delete/{course}/{section}/{user_id}")
    @Produces(MediaType.TEXT_PLAIN)
    //The parameters of the getSectionStudentList are;
    //course: course id of the section student list which is going to be added.
    //section: section number of the section student list which is going to be added.
    //user_id: user id of the section student list which is going to be added.
    public Response deleteSectionStudentList(@PathParam("course")String courseID, @PathParam("section")int sectionNo, @PathParam("user_id") String userID ) {
        try{
            service.deleteSectionStudentList(courseID, sectionNo, userID);
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
    //The parameters of the updateSectionStudentList are;
    //course: course id of the section student list which is going to be updated.
    //section: section number of the section student list which is going to be updated.
    //user_id: user id of the section student list which is going to be updated.
    public Response updateSectionStudentList(@QueryParam("course")String course_id, @QueryParam("section") int section_no,@QueryParam("user_id") String user_id ) {

        try{
            SectionStudentList sectionStudentList = service.getSectionStudentList(course_id,section_no,user_id);
            sectionStudentList=new SectionStudentList(sectionStudentList.getCourseID(), sectionStudentList.getSectionNo(), sectionStudentList.getUserID());
            service.updatesectionStudentList(sectionStudentList);

            return Response.status(200).entity("success").build();
        }
        catch(Exception ex){
            return Response.serverError().build();
        }
        
    }

    @RolesAllowed({"ADMIN","LECTURER","STUDENT"})

    @GET
    @Path("/getSectionStudentList/{courseID}/{sectionID}/{date}")
    @Produces(MediaType.APPLICATION_JSON)
    //The parameters of the getAllGrades are;
    //id: id of the exam which is going to be got.
    public Response getSectionStudentList(@PathParam("courseID") String courseID, @PathParam("sectionID") String sectionID, @PathParam("date") String date){
        try {
            System.out.println(courseID);
            System.out.println(sectionID);
            System.out.println(date);
            JSONArray main = new JSONArray();       //A new JSON array object is created.
            List <Object[]> students = service.getSectionStudentList(courseID, sectionID, date); //Getting all exam grades
            for(Object[] student : students){

                JSONObject jo = new JSONObject();   //A new JSON object for each course is create
                jo.accumulate("id", student[0]);
                jo.accumulate("name", student[1]);
                jo.accumulate("surname", student[2]);

                main.put(jo);   //Put each JSON object to the JSON array object.
            }
            return Response.ok(main.toString()).header("Access-Control-Allow-Origin", "*")
                    .build();
        } catch (JSONException ex) {
            ex.printStackTrace();
        }
        return Response.serverError().build();
    }
}