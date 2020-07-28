import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { Register } from '../../models/regsiter';

import { ToastController, AlertController } from '@ionic/angular';
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  registros: Register[] = [];

  constructor(
    private registerService: RegisterService,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.cargar();
  }

  ionViewWillEnter() {
    this.cargar();
  }

  cargar(): void {
    this.registerService.lista().subscribe(
      data => {
        this.registros = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  borrar(id: number): void {
    this.registerService.delete(id).subscribe(
      data => {
        this.presentToast(data.mensaje);
        this.cargar();
      },
      err => {
        this.presentToast(err.error.mensaje);
      }
    );
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }

  async borrarConfirm(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿seguro que lo deseas eliminar?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.borrar(id);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });

    await alert.present();
  }


}
