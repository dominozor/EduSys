package main.java.utility;

import main.java.models.Attendance;
import main.java.models.AttendanceList;
import main.java.service.Service;
import main.java.service.ServiceImpl;
import org.apache.commons.lang3.RandomStringUtils;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;


/**
 * Created by enver on 12/11/16.
 */
public class CameraUtility {
    private PropertiesUtility propertiesUtility = new PropertiesUtility().getInstance();
    private Service service = new ServiceImpl().getInstance();
    public CameraUtility(){}



    public Attendance takeAttendance(String courseID, int sectionNo) throws IOException {
        String path;
        String line;
        String fileSeperator; //Since operating system can be differ, file seperator must be generic

        DateFormat df = new SimpleDateFormat("yyyyMMdd  HH:mm"); //Format of the date and time
        String sdt = df.format(new Date(System.currentTimeMillis())); //Date is converted into a string

        Attendance attendance = new Attendance(RandomStringUtils.randomAlphanumeric(10).toUpperCase(), sectionNo, courseID, sdt); // A new attendance has been created

        service.addAttendance(attendance); // Attendance is stored at database

        path=propertiesUtility.getProperty("project.basedir"); //From properties file project base direction has been fetched
        fileSeperator=propertiesUtility.getProperty("project.fileSeperator"); //From properties file project file seperator has been fetched

        ProcessBuilder builder = new ProcessBuilder("python" ,path+fileSeperator+"classifier_webcam.py", path+fileSeperator+"feature"+fileSeperator+"classifier.pkl");
        builder.redirectErrorStream(true);
        Process process2 = builder.start(); //Python attendance process has been started


        BufferedReader bfr = new BufferedReader(new InputStreamReader(process2.getInputStream()));
        line = "";
        while((line = bfr.readLine()) != null) { //Output is read line by line

            try {
                JSONObject arr = new JSONObject(line); //Output of the camera module is JSON. Therefore, we have to parse it.
                AttendanceList attList = new AttendanceList(attendance.getId(),(String) arr.get("name")); // After parsing, student is added to that attendance list
                service.addAttendanceList(attList); // Stored at database

            } catch (JSONException e) {
                e.printStackTrace();
            }

        }
        return attendance; //returns attendance for later purposes
    }

}
