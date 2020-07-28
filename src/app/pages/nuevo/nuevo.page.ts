import { Component, OnInit } from '@angular/core';
import { Register } from '../../models/regsiter';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import {CameraResultType, CameraSource, FileReadResult, Plugins} from '@capacitor/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.page.html',
  styleUrls: ['./nuevo.page.scss'],
})
export class NuevoPage implements OnInit {

  photo: SafeResourceUrl;
  registro:Register;
  email = '';
  nombres = '';
  apellidoPaterno = '';
  apellidoMaterno = '';
  sexo = '';
  edad = '';
  calle = '';
  numero = '';
  colonia = '';
  seccion = '';
  codigoPostal = '';
  municipio = '';
  estado = '';
  especialidad = '';
  numeroContacto = '';
  numeroReferencia = '';
  traseraFrontalCredencial = '';
  parteTraseraCredencial = '';
  actaNacimiento = '';
  fotoPerfil = '';
  curp = '';
  seguroSocial = '';
  cuentaBancaria = '';
  nombreBanco = '';

  msjOK = '';
  msjErr = '';

  constructor(
    private registroService: RegisterService,
    private router: Router,
    private toastController: ToastController,
    private readonly sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  onCreate() {
    this.takePhoto();
    this.selectPhoto();
    this.registro = new Register(this.email, this.nombres,this.apellidoPaterno,
      this.apellidoMaterno,this.sexo,this.edad,this.calle,this.numero,this.colonia,this.seccion,this.codigoPostal,this.municipio,
      this.estado,this.especialidad,this.numeroContacto,this.numeroReferencia,this.traseraFrontalCredencial,this.parteTraseraCredencial,this.actaNacimiento,
      this.fotoPerfil,this.curp,this.seguroSocial,this.cuentaBancaria,this.nombreBanco);
    this.registroService.save(this.registro).subscribe(
      data => {
        this.presentToast(data.mensaje);
        this.volver();
      },
      err => {
        this.presentToast(err.error.mensaje);
      }
    );
  }

  vaciar() {
  this.email = '';
  this.nombres = '';
  this.apellidoPaterno = '';
  this.apellidoMaterno = '';
  this.sexo = '';
  this.edad = '';
  this.calle = '';
  this.numero = '';
  this.colonia = '';
  this.seccion = '';
  this.codigoPostal = '';
  this.municipio = '';
  this.estado = '';
  this.especialidad = '';
  this.numeroContacto = '';
  this.numeroReferencia = '';
  this.traseraFrontalCredencial = '';
  this.parteTraseraCredencial = '';
  this.actaNacimiento = '';
  this.fotoPerfil = '';
  this.curp = '';
  this.seguroSocial = '';
  this.cuentaBancaria = ''; 
  this.nombreBanco = '';
  
  }

  volver() {
    this.router.navigate(['/admin','user']);
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }
  async takePhoto() {
    const ab = await this.getPhoto(CameraSource.Camera);
      await this.registroService.credencialFrontalUpload(ab);  
  }
  async selectPhoto() {
    const ab = await this.getPhoto(CameraSource.Photos);

    await this.registroService.credencialFrontalUpload(ab);  
  }
  private async getPhoto(source: CameraSource) {
    const image = await Plugins.Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.webPath));
    return image.webPath;
  }
  private readFile(webPath: string): Promise<FileReadResult> {
    try {
      return Plugins.Filesystem.readFile({
        path: webPath
      });
    } catch (e) {
      console.log(e);
    }
  }

}
