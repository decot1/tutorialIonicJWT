import { Roles } from './roles';
export class NuevoUsuario {
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string; 
    nombreUsuario: string;
    email: string;
    password: string;
    calle: string;
    numero: string;
    colonia: string;
    seccion: string;
    codigoPostal: string;
    municipio: string;
    estado: string;
    roles: string[];

    constructor(nombres: string,apellidoPaterno: string,apellidoMaterno: string ,nombreUsuario: string, email: string, password: string,calle: string,numero: string,colonia: string,seccion: string,codigoPostal: string,municipio: string,estado: string, roles:string[]) {
        this.nombres = nombres;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.nombreUsuario = nombreUsuario;
        this.email = email;
        this.password = password;
        this.calle = calle;
        this.numero = numero;
        this.colonia = colonia;
        this.seccion = seccion;
        this.codigoPostal = codigoPostal;
        this.municipio = municipio;
        this.estado = estado;
        this.roles = roles;

    }
}