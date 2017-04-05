package main.java.utility;

import main.java.models.Attendance;
import main.java.models.AttendanceList;
import main.java.models.EduUser;
import main.java.models.Notification;
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
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;


/**
 * Created by enver on 12/11/16.
 */
public class CameraUtility {


    private final static Logger logger = Logger.getLogger(CameraUtility.class.getName());
    private PropertiesUtility propertiesUtility = new PropertiesUtility().getInstance();
    private Service service = new ServiceImpl().getInstance();
    public CameraUtility(){}



    public Attendance takeAttendance(String courseID, int sectionNo) throws IOException {

        String path;
        String line;
        String fileSeperator; //Since operating system can be differ, file seperator must be generic

        DateFormat df = new SimpleDateFormat("yyyyMMdd  HH:mm"); //Format of the date and time
        String sdt = df.format(new Date(System.currentTimeMillis())); //Date is converted into a string
        String attID = RandomStringUtils.randomAlphanumeric(10).toUpperCase();


        path=propertiesUtility.getProperty("project.basedir"); //From properties file project base direction has been fetched
        fileSeperator=propertiesUtility.getProperty("project.fileSeperator"); //From properties file project file seperator has been fetched

        ProcessBuilder builder = new ProcessBuilder("python" ,path+fileSeperator+"classifier_webcam.py", path+fileSeperator+"feature"+fileSeperator+"classifier.pkl", "--captureDevice", "rtsp://admin:12345@192.168.1.20?tcp");
        builder.redirectErrorStream(true);
        Process process2 = builder.start(); //Python attendance process has been started


        BufferedReader bfr = new BufferedReader(new InputStreamReader(process2.getInputStream()));
        line = "";
        ArrayList<AttendanceList> attArr= new ArrayList<>();
        while((line = bfr.readLine()) != null) { //Output is read line by line

            try {
                JSONObject arr = new JSONObject(line); //Output of the camera module is JSON. Therefore, we have to parse it.
                AttendanceList attList = new AttendanceList(attID,(String) arr.get("name"), (double) arr.get("distance"),(double)arr.get("topCoor"),(double)arr.get("bottomCoor"),(double)arr.get("rightCoor"),(double)arr.get("leftCoor") ); // After parsing, student is added to that attendance list
                attArr.add(attList);

            } catch (JSONException e) {
                e.printStackTrace();
            }

        }
        Attendance attendance = new Attendance(attID, sectionNo, courseID, sdt, attArr.size()); // A new attendance has been created
        service.sendMultipleNotificationsToSectionOrCourse(new Notification("","2","New Attendance Taken\nCourse: "+courseID+"\n" +
                "Section: "+sectionNo+"\nDate: "+sdt,"System",sdt.toString()),courseID,sectionNo+"",false);

        service.addAttendanceListArr(attArr); // Stored at database
        service.addAttendance(attendance); // Attendance is stored at database
        return attendance; //returns attendance for later purposes
    }

    public void trainer(){
        String path;
        String line;
        String fileSeperator; //Since operating system can be differ, file seperator must be generic

        path=propertiesUtility.getProperty("project.basedir"); //From properties file project base direction has been fetched
        fileSeperator=propertiesUtility.getProperty("project.fileSeperator"); //From properties file project file seperator has been fetched

        ProcessBuilder builder = new ProcessBuilder("python" ,path+fileSeperator+"trainer.py","--pathToProject",path+fileSeperator);
        builder.redirectErrorStream(true);
        try {
            Process process2 = builder.start(); //Python first lesson register process has been started
            BufferedReader bfr = new BufferedReader(new InputStreamReader(process2.getInputStream()));
            line = "";
            while((line = bfr.readLine()) != null) {}//Output is read line by line
        } catch (IOException e) {
            logger.severe("Trainer script failed to start!");
            e.printStackTrace();
        }
    }

    public void firstLesson(){
        String path;
        String line;
        String fileSeperator; //Since operating system can be differ, file seperator must be generic

        path=propertiesUtility.getProperty("project.basedir"); //From properties file project base direction has been fetched
        fileSeperator=propertiesUtility.getProperty("project.fileSeperator"); //From properties file project file seperator has been fetched

        System.out.println(path+fileSeperator+"first_lesson.py");
        ProcessBuilder builder = new ProcessBuilder("python" ,path+fileSeperator+"first_lesson.py",path+fileSeperator);
        builder.redirectErrorStream(true);
        try {
            Process process2 = builder.start(); //Python first lesson register process has been started
            BufferedReader bfr = new BufferedReader(new InputStreamReader(process2.getInputStream()));
            line = "";
            while((line = bfr.readLine()) != null){} //Output is read line by line

            trainer();
        } catch (IOException e) {
            logger.severe("First Lesson script failed to start!");
            e.printStackTrace();
        }
    }

    public boolean activateUser(String userID) throws IOException, JSONException {
        String path;
        String line;
        String fileSeperator; //Since operating system can be differ, file seperator must be generic

        path=propertiesUtility.getProperty("project.basedir"); //From properties file project base direction has been fetched
        fileSeperator=propertiesUtility.getProperty("project.fileSeperator"); //From properties file project file seperator has been fetched

        ProcessBuilder builder = new ProcessBuilder("python" ,path+fileSeperator+"classifier_webcam.py", path+fileSeperator+"feature"+fileSeperator+"classifier.pkl");
        builder.redirectErrorStream(true);
        Process process2 = builder.start(); //Python attendance process has been started


        BufferedReader bfr = new BufferedReader(new InputStreamReader(process2.getInputStream()));
        line = "";
        JSONObject arr=null;
        while((line = bfr.readLine()) != null) { //Output is read line by line
            arr = new JSONObject(line);
        }
        if(arr==null) return false;
        else{
            String filePath=path+fileSeperator+"datasetsAligned"+fileSeperator;
            builder = new ProcessBuilder("mv" ,filePath+arr.get("name"), filePath+userID);
            builder.redirectErrorStream(true);
            process2 = builder.start();
            bfr = new BufferedReader(new InputStreamReader(process2.getInputStream()));
            while((line = bfr.readLine()) != null){}
            trainer();
            EduUser user=service.getPerson(userID);
            user.setActive(true);
            service.updatePerson(user);

            return true;
        }
    }

}
