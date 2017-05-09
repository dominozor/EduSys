package main.java.models;

import org.apache.commons.lang3.RandomStringUtils;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by enver on 5/9/17.
 */
@XmlRootElement
@Entity
public class Classroom {
    @Id
    private String id;
    private String name;
    private String cameraIP;


    public Classroom(String name){
        this.name = name;
        this.id = RandomStringUtils.randomAlphanumeric(10).toUpperCase();
    }

    public Classroom() {
    }

    public String getId(){
        return this.id;
    }
    public void setCameraIP(String cameraIP){
        this.cameraIP=cameraIP;
    }
    public String getCameraIP(){
        return this.cameraIP;
    }

    public String getName(){
        return this.name;
    }




}
