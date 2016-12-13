package main.java.utility;

import java.io.*;
import java.util.Properties;

/**
 * Created by enver on 12/11/16.
 */
public class PropertiesUtility { //This is for manipulating general information about project
    PropertiesUtility propertiesUtility;
    Properties properties =new Properties();

    public PropertiesUtility(){}

    public PropertiesUtility getInstance(){ // This class is a singleton
        if(propertiesUtility==null){ //If it is created before, do not recreate it. Else, create a new instance.
            propertiesUtility = new PropertiesUtility();
            return propertiesUtility;
        }
        else return propertiesUtility;
    }

    public String getProperty(String key){ // This function is used for getting data from properties.file which is in the resources
        String line=null;
        try {
            properties.load(getClass().getResourceAsStream("/project.properties")); // First, file is loaded into a inputstream
            line=properties.getProperty(key); // Value has ben taken and stored at line string

            if(key.equals("project.basedir")){ // If it is project.basedir, line is changed
                line=line.substring(0,line.length()-6);
                line+="CamModule";
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
        return line;
    }

    public String setProperty(String key,String value){ // This function is used for setting data in properties.file which is in the resources
        OutputStream out = null;
        String line=null;
        try {
            File file = new File("project.properties");
            properties.load(new FileReader(file));
            properties.setProperty(key,value);
            out = new FileOutputStream( file );
            properties.store(out,"");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return line;
    }
}
