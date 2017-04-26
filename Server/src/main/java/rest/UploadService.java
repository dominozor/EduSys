package main.java.rest;

import javax.annotation.security.PermitAll;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.*;
import java.util.List;

import main.java.service.Service;
import main.java.service.ServiceImpl;
import main.java.utility.CameraUtility;
import main.java.utility.ExcelUtility;
import main.java.utility.PropertiesUtility;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

/**
 * Created by enver on 3/7/17.
 */
@Path("/upload")
public class UploadService  {
    private PropertiesUtility propertiesUtility = new PropertiesUtility().getInstance();
    private Service service = new ServiceImpl();
    private CameraUtility cameraUtility = new CameraUtility();


    @PermitAll
    @POST
    @Path("/attendanceImage")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response uploadAttendanceImageFile (
            @FormDataParam("file") InputStream uploadedInputStream,
            @FormDataParam("file") FormDataContentDisposition fileDetail,
            @FormDataParam("courseID") String courseID,
            @FormDataParam("sectionNo") int sectionNo){
        List<String> fileInformation = service.createTemporaryFileLocation(uploadedInputStream,fileDetail);
        String fileLocation=fileInformation.get(2);

        try {
            cameraUtility.takeAttendanceWithPicture(courseID,sectionNo,fileLocation);
            deleteTemporaryFile(fileLocation);

            return Response.status(200).build();
        } catch (IOException e) {
            e.printStackTrace();
            return Response.status(500).build();
        }
    }

    @PermitAll
    @POST
    @Path("/excelGrades/{examID}")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response uploadExcelFile (
            @FormDataParam("file") InputStream uploadedInputStream,
            @FormDataParam("file") FormDataContentDisposition fileDetail,
            @PathParam("examID") String examID ){

        String tempFileName = RandomStringUtils.randomAlphanumeric(10).toUpperCase();
        String fileExtension = FilenameUtils.getExtension(fileDetail.getFileName());

        ExcelUtility excelUtility = new ExcelUtility();
        String homePath= (propertiesUtility.getProperty("project.basedir")).substring(0,propertiesUtility.getProperty("project.basedir").lastIndexOf('/'));
        String seperator= propertiesUtility.getProperty("project.fileSeperator");

        String fileLocation = homePath+seperator+"Server"+seperator+".temp"+seperator+tempFileName+"."+fileExtension;
        //saving file
        try {
            File temp=new File(fileLocation);

            boolean b;
            b=temp.createNewFile();

            if(b) {
                FileOutputStream out = new FileOutputStream(fileLocation, false);
                int read = 0;
                byte[] bytes = new byte[1024];
                out = new FileOutputStream(new File(fileLocation));
                while ((read = uploadedInputStream.read(bytes)) != -1) {
                    out.write(bytes, 0, read);
                }
                out.flush();
                out.close();
            }
        } catch (IOException e) {e.printStackTrace();}

        if(fileExtension.equals("xls")){
            if(excelUtility.enterGradesXLS(fileLocation,examID)){
                deleteTemporaryFile(fileLocation);
                return Response.status(200).build();
            }
        }
        else if(fileExtension.equals("xlsx")){
            if(excelUtility.enterGradesXLSX(fileLocation,examID)){
                deleteTemporaryFile(fileLocation);
                return Response.status(200).build();
            }
        }
        else if(fileExtension.equals("ods")){
            if(excelUtility.enterGradesODS(fileLocation,examID)){
                deleteTemporaryFile(fileLocation);
                return Response.status(200).build();
            }
        }

        return Response.status(500).build();


    }


    public void deleteTemporaryFile(String fileLocation){

        try{
            File file=new File(fileLocation);

            if(file.delete()){
                System.out.println(file.getName() + " is deleted!");
            }else{
                System.out.println("Delete operation is failed.");
            }
        }
        catch(Exception e){
            e.printStackTrace();
        }

    }

}

