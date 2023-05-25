/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package wsaa;

import homo.wsfev1.FEAuthRequest;
import java.util.Map;
import java.util.ResourceBundle;

/**
 *
 * @author juan
 */
public class WSAARequest {

    public FEAuthRequest getAuth(String service) throws Exception {
        
        WSAAClient wsaaClient = new WSAAClient();

        ResourceBundle bundle = ResourceBundle.getBundle("wsaa_client");

        Map<String, String> afipMap = wsaaClient.searchTA(service);
        FEAuthRequest auth = new FEAuthRequest();
        auth.setCuit(Long.parseLong(bundle.getString("CUIT")));
        auth.setToken(afipMap.get("token"));
        auth.setSign(afipMap.get("sign"));
        
        return auth;
    }

}
