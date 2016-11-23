package main.java.rest;

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

import main.java.models.EduUser;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import main.java.service.Service;
import main.java.service.ServiceImpl;


@Path ("/user")
public class UserRestService {
	
	Service service = new ServiceImpl().getInstance();

	@GET
	@Path("/test")
	public String test(){
		return "test...";			
	}
	
	@POST
	@Path("/login")
	@Produces(MediaType.TEXT_PLAIN)
	public Response login(@QueryParam("ID") String id,@QueryParam("password") String pass){
		try{

			EduUser person=service.getPerson(id);


			String digestedPass = org.apache.commons.codec.digest.DigestUtils.sha256Hex(pass);
			System.out.println(person.getPassword());
			System.out.println(digestedPass);
			if(digestedPass.equals(person.getPassword())){

				if(person.getRole()==0){ // if user is admin
					return Response.status(200).entity("1").build();
				}
				else{
					return Response.status(200).entity("0").build();
				}
			}
			else{ // if password is wrong
				return Response.status(200).entity("e1").build();
			}

		}
		catch(Exception ex){
			return Response.status(200).entity("e2").build();
		}
	}

	
}
