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
        String fileSeperator;

        DateFormat df = new SimpleDateFormat("yyyyMMdd  HH:mm");
        String sdt = df.format(new Date(System.currentTimeMillis()));

        Attendance attendance = new Attendance(RandomStringUtils.randomAlphanumeric(10).toUpperCase(), sectionNo, courseID, sdt);

        service.addAttendance(attendance);

        path=propertiesUtility.getProperty("project.basedir");
        fileSeperator=propertiesUtility.getProperty("project.fileSeperator");

        ProcessBuilder builder = new ProcessBuilder("python" ,path+fileSeperator+"classifier_webcam.py", path+fileSeperator+"feature"+fileSeperator+"classifier.pkl");
        builder.redirectErrorStream(true);
        Process process2 = builder.start();


        BufferedReader bfr = new BufferedReader(new InputStreamReader(process2.getInputStream()));
        line = "";
        while((line = bfr.readLine()) != null) {

            try {
                JSONObject arr = new JSONObject(line);
                AttendanceList attList = new AttendanceList(attendance.getId(),(String) arr.get("name"));
                service.addAttendanceList(attList);

            } catch (JSONException e) {
                e.printStackTrace();
            }

        }
        return attendance;
    }

}
