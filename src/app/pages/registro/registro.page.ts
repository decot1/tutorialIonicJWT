import { Component, OnInit } from '@angular/core';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { concatMap } from 'rxjs/operators';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { Roles } from '../../models/roles';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  isAdmin: boolean;

  nuevoUsuario: NuevoUsuario;
  loginUsuario: LoginUsuario;
   //roles: Roles;
  nombres = '';
  apellidoPaterno = '';
  apellidoMaterno = ''; 
  nombreUsuario = '';
  email = '';
  password = '';
  calle = '';
  numero = '';
  colonia = '';
  seccion = '';
  codigoPostal = '';
  municipio = '';
  estado = '';
  roles = '';
  rol = [];
  isLogged = false;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.testLogged();
  }

  ionViewWillEnter() {
    this.testLogged();
    this.vaciar();
  }

  onRegister() {
    const roles_usuario  = [];
    roles_usuario.push(this.roles);
    this.nuevoUsuario = new NuevoUsuario(this.nombres,this.apellidoPaterno,this.apellidoMaterno,this.nombreUsuario, this.email, this.password,this.calle,this.numero,
    this.colonia,this.seccion,this.codigoPostal,this.municipio,this.estado, roles_usuario);
    console.log(this.nuevoUsuario);
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);

    this.authService.registro(this.nuevoUsuario).pipe(concatMap (nuevoRes => this.authService.login(this.loginUsuario))).subscribe(
      data => {
        this.tokenService.setToken(data.token);
        this.isLogged = true;
       
        this.presentToast('cuenta creada');
        //this.router.navigate(['/']);
      },
      err => {
        this.presentToast(err.error.mensaje);
      }
    );
  }

  vaciar() {
    this.nombres = '';
    this.apellidoPaterno = '';
    this.apellidoMaterno = '';
    this.nombreUsuario = '';
    this.email = '';
    this.password = '';
    this.calle = '';
    this.numero = '';
    this.colonia = '';
    this.seccion = '';
    this.codigoPostal = '';
    this.municipio = '';
    this.estado = '';
    this.roles = ''    
  }

  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }

  logOut(): void {
    this.tokenService.logOut();
    this.isLogged = false;
    this.vaciar();
  }

  testLogged(): void {
    this.isLogged = this.tokenService.getToken() != null;
  }
 

}
