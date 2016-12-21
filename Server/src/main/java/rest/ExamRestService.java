package main.java.rest;

import javax.ws.rs.Path;
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


import main.java.models.Exam;
import main.java.service.Service;
import main.java.service.ServiceImpl;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
/**
 * Created by Enver.
 */
@Path("/exam")
public class ExamRestService {

    Service service = new ServiceImpl().getInstance();

    @GET
    @Path("/test")
    public String test(){
        return "test...";
    }

    @GET
    @Path("/get/{ID}")
    @Produces(MediaType.APPLICATION_JSON)
    //The parameters of the getExam are;
    //id: id of the exam which is going to be got.
    public Response getExam(@PathParam("ID") String id){
        try {


            JSONObject jo = new JSONObject();
            Exam exam = service.getExam(id);
            if(!(exam==null)){
                jo.accumulate("id", exam.getExam_id());
                jo.accumulate("course_id", exam.getCourseID());
                jo.accumulate("section_no", exam.getSectionNo());
                jo.accumulate("type", exam.getType());
                jo.accumulate("average", exam.getAverage());
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
    //This function gets the list of exam from the database.
    public Response listExam(){
        try {
            JSONArray main = new JSONArray();
            List <Exam> exams = service.getAllExams();
            for(Exam exam : exams){

                JSONObject jo = new JSONObject();
                jo.accumulate("id", exam.getExam_id());
                jo.accumulate("course_id", exam.getCourseID());
                jo.accumulate("section_no", exam.getSectionNo());
                jo.accumulate("type", exam.getType());
                jo.accumulate("average", exam.getAverage());

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
    //The parameters of the addExam are;
    //id: id of the exam which is going to be added.
    //id: course id of the exam which is going to be added.
    //id: section number of the exam which is going to be added.
    //id: type of the exam which is going to be added.
    @Produces(MediaType.TEXT_PLAIN)
    public Response addExam(@QueryParam("ID") String id,@QueryParam("course")String course_id, @QueryParam("section") String section_no,@QueryParam("type") String type) {

        try{

            Exam exam=new Exam(id, course_id, section_no, type, 0.0);
            service.addExam(exam);

            return Response.status(200).entity("success").build();
        }
        catch(Exception ex){
            return Response.serverError().build();
        }

    }

    @DELETE
    @Path("/delete/{id}")
    @Produces(MediaType.TEXT_PLAIN)
    //The parameters of the deleteExam are;
    //id: id of the exam which is going to be deleted.
    public Response deleteExam(@PathParam("id") String id) {
        try{
            service.deleteExam(id);
            return Response.status(200).entity("success").build();
        }
        catch(Exception ex){
            return Response.serverError().build();
        }
    }

    @PUT
    @Path("/update")
    @Produces(MediaType.TEXT_PLAIN)
    //The parameters of the updateExam are;
    //id: id of the exam which is going to be updated.
    //id: course id of the exam which is going to be updated.
    //id: section number of the exam which is going to be updated.
    //id: type of the exam which is going to be updated.
    public Response updateExam(@QueryParam("ID") String id,@QueryParam("course")String course_id, @QueryParam("section") String section_no,@QueryParam("type") String type,@QueryParam("average") double average) {

        try{
            Exam exam = service.getExam(id);
            Exam ex=new Exam(exam.getExam_id(), course_id, section_no, type, average);
            service.updateExam(ex);

            return Response.status(200).entity("success").build();
        }
        catch(Exception ex){
            return Response.serverError().build();
        }

    }

    @GET
    @Path("/getAllGrades/{ID}")
    @Produces(MediaType.APPLICATION_JSON)
    //The parameters of the getExam are;
    //id: id of the exam which is going to be got.
    public Response getAllGradesOfAnExam(@PathParam("ID") String examID){
        try {
            JSONArray main = new JSONArray();		//A new JSON array object is created.
            List <Object[]> grades = service.getAllGradesOfACourse(examID); //Getting an exam grade and type of student with given id.
            System.out.println();
            for(Object[] grade : grades){

                JSONObject jo = new JSONObject();   //A new JSON object for each course is create
                jo.accumulate("id", grade[0]); // Putting name of course
                jo.accumulate("name", grade[1]); // Putting name of course
                jo.accumulate("surname", grade[2]); // Putting name of course
                jo.accumulate("grade", grade[3]); // Putting grade

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
