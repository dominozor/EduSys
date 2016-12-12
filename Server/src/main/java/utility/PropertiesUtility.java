package main.java.utility;

import java.io.*;
import java.util.Properties;

/**
 * Created by enver on 12/11/16.
 */
public class PropertiesUtility {
    PropertiesUtility propertiesUtility;
    Properties properties =new Properties();

    public PropertiesUtility(){}

    public PropertiesUtility getInstance(){
        if(propertiesUtility==null){
            propertiesUtility = new PropertiesUtility();
            return propertiesUtility;
        }
        else return propertiesUtility;
    }

    public String getProperty(String key){
        String line=null;
        try {
            properties.load(getClass().getResourceAsStream("/project.properties"));
            line=properties.getProperty(key);

            if(key.equals("project.basedir")){
                line=line.substring(0,line.length()-6);
                line+="CamModule";
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
        return line;
    }

    public String setProperty(String key,String value){
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
