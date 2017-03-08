package main.java.rest;


import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.*;
import java.nio.file.Files;
import java.util.Iterator;

import main.java.utility.ExcelUtility;
import main.java.utility.PropertiesUtility;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.util.IOUtils;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

/**
 * Created by enver on 3/7/17.
 */
@Path("/upload")
public class UploadService  {
    private PropertiesUtility propertiesUtility = new PropertiesUtility().getInstance();


    @POST
    @Path("/excelGrades")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response uploadFile (
            @FormDataParam("file") InputStream uploadedInputStream,
            @FormDataParam("file") FormDataContentDisposition fileDetail,
            @FormDataParam("examID") String examID ){

        ExcelUtility excelUtility = new ExcelUtility();
        String homePath= (propertiesUtility.getProperty("project.basedir")).substring(0,propertiesUtility.getProperty("project.basedir").lastIndexOf('/'));
        String seperator= propertiesUtility.getProperty("project.fileSeperator");

        String fileLocation = homePath+seperator+"Server"+seperator+".temp"+seperator+fileDetail.getFileName();
        //saving file
        try {
            File temp=new File(fileLocation);
            boolean b=false;

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

        if(excelUtility.enterGrades(fileLocation,examID)){
            return Response.status(200).build();
        }
        else{
            return Response.status(500).build();
        }

    }
}

