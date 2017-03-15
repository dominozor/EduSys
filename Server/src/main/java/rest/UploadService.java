package main.java.rest;

import javax.annotation.security.PermitAll;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.*;
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

    @PermitAll
    @POST
    @Path("/excelGrades")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response uploadFile (
            @FormDataParam("file") InputStream uploadedInputStream,
            @FormDataParam("file") FormDataContentDisposition fileDetail,
            @FormDataParam("examID") String examID ){

        String tempFileName = RandomStringUtils.randomAlphanumeric(10).toUpperCase();
        String fileExtention = FilenameUtils.getExtension(fileDetail.getFileName());

        ExcelUtility excelUtility = new ExcelUtility();
        String homePath= (propertiesUtility.getProperty("project.basedir")).substring(0,propertiesUtility.getProperty("project.basedir").lastIndexOf('/'));
        String seperator= propertiesUtility.getProperty("project.fileSeperator");

        String fileLocation = homePath+seperator+"Server"+seperator+".temp"+seperator+tempFileName+"."+fileExtention;
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

        if(fileExtention.equals("xls")){
            if(excelUtility.enterGradesXLS(fileLocation,examID)){
                return Response.status(200).build();
            }
        }
        else if(fileExtention.equals("xlsx")){
            if(excelUtility.enterGradesXLSX(fileLocation,examID)){
                return Response.status(200).build();
            }
        }
        else if(fileExtention.equals("ods")){
            if(excelUtility.enterGradesODS(fileLocation,examID)){
                return Response.status(200).build();
            }
        }

        return Response.status(500).build();


    }
}

