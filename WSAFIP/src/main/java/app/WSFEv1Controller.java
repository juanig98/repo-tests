package app;

import entities.StatusMessageResponse;
import homo.wsfev1.CbteTipo;
import homo.wsfev1.CbteTipoResponse;
import homo.wsfev1.ConceptoTipo;
import homo.wsfev1.ConceptoTipoResponse;
import homo.wsfev1.Cotizacion;
import homo.wsfev1.DocTipoResponse;
import homo.wsfev1.FEAuthRequest;
import homo.wsfev1.DocTipo;
import homo.wsfev1.FECotizacionResponse;
import homo.wsfev1.FEParamGetTiposOpcionalResponse;
import homo.wsfev1.FEPtoVentaResponse;
import homo.wsfev1.FETributoResponse;
import homo.wsfev1.IvaTipo;
import homo.wsfev1.IvaTipoResponse;
import homo.wsfev1.Moneda;
import homo.wsfev1.MonedaResponse;
import homo.wsfev1.OpcionalTipo;
import homo.wsfev1.OpcionalTipoResponse;
import homo.wsfev1.PtoVenta;
import homo.wsfev1.Service;
import homo.wsfev1.ServiceSoap;
import homo.wsfev1.TributoTipo;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.logging.Logger;
import org.springframework.http.HttpStatus;
import wsaa.WSAAClient;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import wsaa.WSAARequest;

@RestController
@RequestMapping("wsfe")
public class WSFEv1Controller {

    private static final String SERVICE_REFERENCE = "wsfe";
    private static final Logger LOG = Logger.getLogger(WSFEv1Controller.class.getName());

    @GetMapping("")
    public StatusMessageResponse status() {
        return new StatusMessageResponse(200, WSFEv1Controller.class.getSimpleName() + " found");
    }

    @GetMapping("/documents-types")
    public List<DocTipo> getDocumentsTypes() {
        try {

            Service service = new Service();
            ServiceSoap soap = (ServiceSoap) service.getServiceSoap();
            WSAARequest reqAuth = new WSAARequest();

            DocTipoResponse response = soap.feParamGetTiposDoc(reqAuth.getAuth(SERVICE_REFERENCE));

            return response.getResultGet().getDocTipo();

        } catch (Exception e) {
            LOG.severe(e.getMessage());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No results");
        }
    }

    @GetMapping("/vouchers-types")
    public List<CbteTipo> getVouchersTypes() {
        try {

            Service service = new Service();
            ServiceSoap soap = (ServiceSoap) service.getServiceSoap();
            WSAARequest reqAuth = new WSAARequest();

            CbteTipoResponse response = soap.feParamGetTiposCbte(reqAuth.getAuth(SERVICE_REFERENCE));

            return response.getResultGet().getCbteTipo();

        } catch (Exception e) {
            LOG.severe(e.getMessage());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No results");
        }
    }

    @GetMapping("/concepts-types")
    public List<ConceptoTipo> getConceptsTypes() {
        try {

            Service service = new Service();
            ServiceSoap soap = (ServiceSoap) service.getServiceSoap();
            WSAARequest reqAuth = new WSAARequest();

            ConceptoTipoResponse response = soap.feParamGetTiposConcepto(reqAuth.getAuth(SERVICE_REFERENCE));

            return response.getResultGet().getConceptoTipo();

        } catch (Exception e) {
            LOG.severe(e.getMessage());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No results");
        }
    }

    @GetMapping("/aliquots-types")
    public List<IvaTipo> getAliquotsTypes() {
        try {

            Service service = new Service();
            ServiceSoap soap = (ServiceSoap) service.getServiceSoap();
            WSAARequest reqAuth = new WSAARequest();

            IvaTipoResponse response = soap.feParamGetTiposIva(reqAuth.getAuth(SERVICE_REFERENCE));

            return response.getResultGet().getIvaTipo();

        } catch (Exception e) {
            LOG.severe(e.getMessage());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No results");
        }
    }

    @GetMapping("/coins-types")
    public List<Moneda> getCoinsTypes() {
        try {

            Service service = new Service();
            ServiceSoap soap = (ServiceSoap) service.getServiceSoap();
            WSAARequest reqAuth = new WSAARequest();

            MonedaResponse response = soap.feParamGetTiposMonedas(reqAuth.getAuth(SERVICE_REFERENCE));

            return response.getResultGet().getMoneda();

        } catch (Exception e) {
            LOG.severe(e.getMessage());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No results");
        }
    }

    @GetMapping("/optionals-types")
    public List<OpcionalTipo> getOptionalsTypes() {
        try {

            Service service = new Service();
            ServiceSoap soap = (ServiceSoap) service.getServiceSoap();
            WSAARequest reqAuth = new WSAARequest();

            OpcionalTipoResponse response = soap.feParamGetTiposOpcional(reqAuth.getAuth(SERVICE_REFERENCE));

            return response.getResultGet().getOpcionalTipo();

        } catch (Exception e) {
            LOG.severe(e.getMessage());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No results");
        }
    }

    @GetMapping("/tributes-types")
    public List<TributoTipo> getTributesTypes() {
        try {

            Service service = new Service();
            ServiceSoap soap = (ServiceSoap) service.getServiceSoap();
            WSAARequest reqAuth = new WSAARequest();

            FETributoResponse response = soap.feParamGetTiposTributos(reqAuth.getAuth(SERVICE_REFERENCE));

            return response.getResultGet().getTributoTipo();

        } catch (Exception e) {
            LOG.severe(e.getMessage());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No results");
        }
    }

    @GetMapping("/points-of-sale")
    public List<PtoVenta> getPointsOfSale() {
        try {

            Service service = new Service();
            ServiceSoap soap = (ServiceSoap) service.getServiceSoap();
            WSAARequest reqAuth = new WSAARequest();

            FEPtoVentaResponse response = soap.feParamGetPtosVenta(reqAuth.getAuth(SERVICE_REFERENCE));

            return response.getResultGet().getPtoVenta();

        } catch (Exception e) {
            LOG.severe(e.getMessage());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No results");
        }
    }

    @GetMapping("/currency-quote")
    public Cotizacion getCurrencyQuote(@RequestParam(name = "id") String id) {
        try {

            Service service = new Service();
            ServiceSoap soap = (ServiceSoap) service.getServiceSoap();
            WSAARequest reqAuth = new WSAARequest();

            FECotizacionResponse response = soap.feParamGetCotizacion(reqAuth.getAuth(SERVICE_REFERENCE), id);

            return response.getResultGet();

        } catch (Exception e) {
            LOG.severe(e.getMessage());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No results");
        }
    }
}
