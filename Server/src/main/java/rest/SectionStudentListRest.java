package main.java.rest;

import main.java.models.SectionStudentList;
import main.java.service.Service;
import main.java.service.ServiceImpl;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

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

            return Response.ok(jo).header("Access-Control-Allow-Origin", "*")
                    .build();
        } catch (JSONException ex) {

        }
        return Response.serverError().build();
    }

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
            return Response.ok(main).header("Access-Control-Allow-Origin", "*")
                    .build();
        } catch (JSONException ex) {

        }
        return Response.serverError().build();
    }

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
}
