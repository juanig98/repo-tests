/** Archivo de configuración de rutas */
import { environment } from './../../environments/environment';

/** Ruta actual */
export const current_route = window.location.pathname;

/** Ruta de peticiones al servidor */
export const route_web = `${window.location.origin}`;

/** Ruta de peticiones al servidor */
const protocol_api = (!environment.production) ? 'http' : 'http';
const dir_api = (!environment.production) ? 'localhost' : 'creditin.ddns.net';
const port_api = (!environment.production) ? '3000' : '';
const pathname_api = (!environment.production) ? 'api' : 'api'
export const route_api = `${protocol_api}://${dir_api}${port_api ? ":" + port_api : ""}/${pathname_api}`;
