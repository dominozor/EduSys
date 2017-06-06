package main.java.rest;

import main.java.models.Attendance;
import main.java.models.AttendanceList;
import main.java.service.Service;
import main.java.service.ServiceImpl;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Enver.
 */
@Path("/attendanceList")
public class AttendanceListRest {

    Service service = new ServiceImpl().getInstance();

    @GET
    @Path("/test")
    public String test(){
        return "test...";
    }

    @RolesAllowed({"ADMIN","LECTURER","STUDENT"})
    @GET
    @Path("/get/{id}/{userID}")
    @Produces(MediaType.APPLICATION_JSON)
    //The parameters of the getAttendanceList are;
    //id: id of the attendance list which is going to be got.
    //userID: User id of the lecturer.
    public Response getAttendanceList(@PathParam("id")String id, @PathParam("userID") String userID){
        try {

            JSONObject jo = new JSONObject();
            AttendanceList alist = service.getAttendanceList(id,userID);
            if(!(alist==null)){
                jo.accumulate("id", alist.getAtt_id());
                jo.accumulate("userID", alist.getUserID());
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
    public Response listAttendanceList(){
        try {
            JSONArray main = new JSONArray();
            List<AttendanceList> alists = service.getAllAttendanceLists();
            for(AttendanceList alist : alists){

                JSONObject jo = new JSONObject();
                jo.accumulate("id", alist.getAtt_id());
                jo.accumulate("userID", alist.getUserID());
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
    //The parameters of the addAttendanceList are;
    //id: id of the attendance list which is going to be added.
    //userID: User id of the lecturer.
    public Response addAttendanceList(@QueryParam("id")String id, @QueryParam("userID") String userID, @QueryParam("distance") double distance,@QueryParam("topCoor") double top,@QueryParam("bottomCoor") double bot,@QueryParam("rightCoor") double right,@QueryParam("leftCoor") double left ) {

        try{

            AttendanceList alist=new AttendanceList(id, userID,distance,top,bot,right,left);
            service.addAttendanceList(alist);

            return Response.status(200).entity("success").build();
        }
        catch(Exception ex){
            return Response.serverError().build();
        }

    }

    @RolesAllowed({"ADMIN","LECTURER"})
    @DELETE
    @Path("/delete/{id}/{userID}")
    @Produces(MediaType.TEXT_PLAIN)
    //The parameters of the deleteAttendanceList are;
    //id: id of the attendance list which is going to be deleted.
    //userID: User id of the lecturer.
    public Response deleteAttendanceList(@PathParam("id") String id, @PathParam("userID") String userID ) {
        try{
            Attendance curAtt = service.getAttendance(id);
            Attendance newAtt = new Attendance(curAtt.getId(), curAtt.getSectionNo(), curAtt.getCourseId(), curAtt.getDate(), curAtt.getNumberOfStudents()-1);
            service.updateAttendance(newAtt);
            service.deleteAttendanceList(id, userID);
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
    //The parameters of the deleteAttendanceList are;
    //id: id of the attendance list which is going to be updated.
    //userID: User id of the lecturer.
    public Response updateAttendanceList(@QueryParam("id")String id, @QueryParam("userID") String userID ) {

        try{
            AttendanceList alist = service.getAttendanceList(id,userID);
            alist=new AttendanceList(alist.getAtt_id(), alist.getUserID(), alist.getDistance(), alist.getTop(),alist.getBottom(),alist.getRight(),alist.getLeft());
            service.updateAttendanceList(alist);

            return Response.status(200).entity("success").build();
        }
        catch(Exception ex){
            return Response.serverError().build();
        }

    }

    @RolesAllowed({"ADMIN","LECTURER"})
    @POST
    @Path("/addStudent")
    @Produces(MediaType.TEXT_PLAIN)
    //The parameters of the addAttendanceList are;
    //id: id of the attendance list which is going to be added.
    //userID: User id of the lecturer.
    public Response addStudent(@QueryParam("ID")String id, @QueryParam("students") String students) {

        try{
            String[] splitStudents = students.split(",");
            ArrayList<AttendanceList> attArr= new ArrayList<>();
            for(String student : splitStudents) {
                String[] studentAttributes = student.split("-");
                if(studentAttributes[1].equals("1")) {
                    AttendanceList attList = new AttendanceList(id, studentAttributes[0], 100, 400, 500, 150, 160);
                    attArr.add(attList);
                }
                else if(studentAttributes[1].equals("2")) {
                    AttendanceList attList = new AttendanceList(id, studentAttributes[0], 400, 400, 500, 150, 160);
                    attArr.add(attList);
                }
                else {
                    AttendanceList attList = new AttendanceList(id, studentAttributes[0], 800, 400, 500, 150, 160);
                    attArr.add(attList);
                }
            }
            Attendance curAtt = service.getAttendance(id);
            Attendance newAtt = new Attendance(curAtt.getId(), curAtt.getSectionNo(), curAtt.getCourseId(), curAtt.getDate(), curAtt.getNumberOfStudents()+splitStudents.length);
            service.updateAttendance(newAtt);
            service.addAttendanceListArr(attArr);
            return Response.status(200).entity("success").build();
        }
        catch(Exception ex){
            return Response.serverError().build();
        }

    }

}
