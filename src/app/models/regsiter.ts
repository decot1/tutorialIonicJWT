export class Register {
    id?: number;
    email: string;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string; 
    sexo: string;
    edad: string;
    calle: string;
    numero: string;
    colonia: string;
    seccion: string;
    codigoPostal: string;
    municipio: string;
    estado: string;
    especialidad: string;
    numeroContacto: string;
    numeroReferencia: string;
    traseraFrontalCredencial: string;
    parteTraseraCredencial: string;
    actaNacimiento: string;
    fotoPerfil: string;
    curp: string;
    seguroSocial: string;
    cuentaBancaria: string;
    nombreBanco: string;
    constructor(email: string, nombres: string, apellidoPaterno: string, apellidoMaterno: string,sexo: string ,edad: string,calle: string, 
        numero: string, colonia: string, seccion: string, codigoPostal: string, municipio: string, estado: string,
        especialidad: string,numeroContacto: string,numeroReferencia: string, traseraFrontalCredencial: string, parteTraseraCredencial: string, actaNacimiento: string,
        fotoPerfil: string,curp: string,seguroSocial: string,cuentaBancaria: string,nombreBanco: string) {
        this.email = email;
        this.nombres = nombres;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.sexo = sexo;
        this.edad = edad;
        this.calle = calle;
        this.numero = numero;
        this.colonia = colonia;
        this.seccion = seccion;
        this.codigoPostal = codigoPostal;
        this.municipio = municipio;
        this.estado = estado;
        this.especialidad = especialidad;
        this.numeroContacto = numeroContacto;
        this.numeroReferencia = numeroReferencia;
        this.traseraFrontalCredencial = traseraFrontalCredencial;
        this.parteTraseraCredencial = parteTraseraCredencial;
        this.actaNacimiento = actaNacimiento;
        this.fotoPerfil = fotoPerfil;
        this.curp = curp;
        this.seguroSocial = seguroSocial;
        this.cuentaBancaria = cuentaBancaria;
        this.nombreBanco = nombreBanco;
    }
}