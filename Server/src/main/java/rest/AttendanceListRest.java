package main.java.rest;

import main.java.models.AttendanceList;
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
@Path("/attendanceList")
public class AttendanceListRest {

    Service service = new ServiceImpl().getInstance();

    @GET
    @Path("/test")
    public String test(){
        return "test...";
    }

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

    @DELETE
    @Path("/delete/{id}/{userID}")
    @Produces(MediaType.TEXT_PLAIN)
    //The parameters of the deleteAttendanceList are;
    //id: id of the attendance list which is going to be deleted.
    //userID: User id of the lecturer.
    public Response deleteAttendanceList(@PathParam("id") String id, @PathParam("id") String userID ) {
        try{
            service.deleteAttendanceList(id, userID);
            return Response.status(200).entity("success").build();
        }
        catch(Exception ex){
            return Response.serverError().build();
        }
    }

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

}
