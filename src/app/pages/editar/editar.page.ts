import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Register } from '../../models/regsiter';
import { RegisterService } from '../../services/register.service';

import { HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  registro: Register = new Register('','','','','','','','','','','','','','','','','','','','','','','','');
  private imagenSeleccionada: File;
  private imagenSeleccionada1: File;
   progreso: number = 0;
  msjOK = '';
  msjErr = '';

  constructor(
    private registerService : RegisterService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.cargar();
  }

  cargar(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.registerService .detail(id).subscribe(
      data => {
        this.registro = data;
      },
      err => {
        this.volver();
      }
    );
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.subirFoto();
    this.subirFoto1();
    this.registerService.update(id, this.registro).subscribe(
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
    this.registro.nombres = '';
  }

  volver() {
    this.router.navigate(['/admin']);
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }

  seleccionarFoto(event){
    this.progreso = 0;
  this.imagenSeleccionada = event.target.files[0];
  console.log(this.imagenSeleccionada);
  }
  seleccionarFoto1(event){
    this.progreso = 0;
  this.imagenSeleccionada1 = event.target.files[0];
  console.log(this.imagenSeleccionada1);
  }

  subirFoto(){
 
      this.registerService.subirFotoFrontalCredencial(this.imagenSeleccionada, this.registro.id)
      .subscribe(event => {
       if(event.type === HttpEventType.UploadProgress){
         this.progreso = Math.round((event.loaded/event.total)*100);
       }else if(event.type === HttpEventType.Response){
        let response:any = event.body;
        this.registro = response.registro as Register;
        //swal.success('La Foto se ha subido completamente!', response.mensaje, 'succes');
       }
        //this.registro = registro;
      }); 
  }
  subirFoto1(){
 
    this.registerService.subirFotoTraseraCredencial(this.imagenSeleccionada1, this.registro.id)
    .subscribe(event => {
     if(event.type === HttpEventType.UploadProgress){
       this.progreso = Math.round((event.loaded/event.total)*100);
     }else if(event.type === HttpEventType.Response){
      let response:any = event.body;
      this.registro = response.registro as Register;
      //swal.success('La Foto se ha subido completamente!', response.mensaje, 'succes');
     }
      //this.registro = registro;
    }); 
}

}
