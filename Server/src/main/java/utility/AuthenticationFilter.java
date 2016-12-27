package main.java.utility;

import javax.ws.rs.core.Cookie;
import javax.ws.rs.ext.Provider;
import java.lang.reflect.Method;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

import javax.annotation.security.DenyAll;
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;

import org.apache.commons.codec.binary.Base32;
import org.apache.commons.codec.binary.Base64;



/**
 * Created by enver on 12/25/16.
 */
@Provider
public class AuthenticationFilter {
    @Context
    private ResourceInfo resourceInfo;

    private static final String AUTHORIZATION_PROPERTY = "Authorization";
    private static final String AUTHENTICATION_SCHEME = "Basic";
    private static final Response ACCESS_DENIED = Response.status(Response.Status.UNAUTHORIZED)
            .entity("You cannot access this resource").build();
    private static final Response ACCESS_FORBIDDEN = Response.status(Response.Status.FORBIDDEN)
            .entity("Access blocked for all users !!").build();

    public static String getTokenValue(String token,String key){
        Base32 base32 = new Base32();
        Base64 base64 = new Base64();
        String decoded32 = new String(base32.decode(token.getBytes()));
        token = new String(base64.decode(decoded32.getBytes()));
        token=token.substring(4);
        String mask1="$12,";
        String mask2=".%43";
        String username;
        String password;
        int nextMask=token.indexOf(mask1);
        username=token.substring(0,nextMask);
        token=token.substring(nextMask+4);
        nextMask=token.indexOf(mask2);
        password=token.substring(0,nextMask);
        if(key.equals("username")){
            return username;
        }
        else if(key.equals("password")){
            return password;
        }
        return null;
    }
    public static String createToken(String userID,String pass){
        DateFormat df = new SimpleDateFormat("HH:mm"); //Format of the date and time
        String sdt = df.format(new Date(System.currentTimeMillis())); //Date is converted into a string
        String token ="";
        String mask1="$12,";
        String mask2=".%43";
        String mask3="1d2f";
        token=token+mask1+userID+mask2+pass+mask3+sdt;
        Base32 base32 = new Base32();
        Base64 base64 = new Base64();


        return (new String(base32.encode((new String(base64.encode(token.getBytes()))).getBytes())));
    }

    public void filter(ContainerRequestContext requestContext)
    {
        Method method = resourceInfo.getResourceMethod();
        //Access allowed for all
        if( ! method.isAnnotationPresent(PermitAll.class))
        {
            //Access denied for all
            if(method.isAnnotationPresent(DenyAll.class))
            {
                requestContext.abortWith(ACCESS_FORBIDDEN);
                return;
            }



            //Fetch authorization header

            Cookie cookie=null;
            for (Cookie c : requestContext.getCookies().values())
            {
                if (c.getName().equals("TOKEN")) {
                    cookie = c;
                    break;
                }
            }

            //If no authorization information present; block access
            if(cookie == null )
            {
                requestContext.abortWith(ACCESS_DENIED);
                return;
            }

            //Get encoded username and password
            final String encodedUserPassword = cookie.getValue();

            //Decode username and password
            String token = new String(encodedUserPassword.getBytes());

            //Split username and password tokens
            String username=getTokenValue(token,"username");
            String password=getTokenValue(token,"password");

            //Verifying Username and password
            System.out.println(username);
            System.out.println(password);

            //Verify user access
            if(method.isAnnotationPresent(RolesAllowed.class))
            {
                RolesAllowed rolesAnnotation = method.getAnnotation(RolesAllowed.class);
                Set<String> rolesSet = new HashSet<String>(Arrays.asList(rolesAnnotation.value()));

                //Is user valid?
                if( ! isUserAllowed(username, password, rolesSet))
                {
                    requestContext.abortWith(ACCESS_DENIED);
                    return;
                }
            }
        }
    }
    private boolean isUserAllowed(final String username, final String password, final Set<String> rolesSet)
    {
        boolean isAllowed = false;



        //For now;
        return true;
    }
}