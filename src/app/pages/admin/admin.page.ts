import { Component, OnInit , ViewChild   } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Register } from '../../models/regsiter';
import { RegisterService } from '../../services/register.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  registros: Register[] = [];

  constructor(
    private registerService: RegisterService,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }
  displayedColumns: string[] = ['id', 'nombres','acciones'];
  dataSource = new MatTableDataSource<Register>(this.registros);
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  // MatPaginator Output
  page: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    length: 0
  };

  ngOnInit() {
    //this.cargar();
    this.loadData();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  
 

  private loadData(){
    this.registros = [];
    this.registerService.getPageAllByRegister(this.page.pageIndex, this.page.pageSize).subscribe((data: any) => {
      console.log(data);
      this.registros = data.content;
      console.log(this.registros);
   
      this.page.length = data.totalElements;
      this.dataSource = new MatTableDataSource<Register>(this.registros);
   
    });
  }
  changeData($event) {
    this.page = $event;
    this.loadData();
    return $event;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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





