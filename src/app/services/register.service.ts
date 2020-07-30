import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Register } from '../models/regsiter';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import {LoadingController, ToastController} from '@ionic/angular';
import {finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private counter = 0;
  public error: string;
  private loading: any;

  registroURL = 'http://localhost:8080/Register/'; // cambia cuando lo subamos a  heroku

  constructor(private httpClient: HttpClient,private readonly loadingCtrl: LoadingController,private readonly toastCtrl: ToastController) { }
  
  public lista(): Observable<Register[]> {
    return this.httpClient.get<Register[]>(this.registroURL + 'lista');
  }

  public detail(id: number): Observable<Register> {
    return this.httpClient.get<Register>(this.registroURL + `detail/${id}`);
  }

  public detailName(nombre: string): Observable<Register> {
    return this.httpClient.get<Register>(this.registroURL + 'detailname/${nombres}');
  }

  public save(register: Register): Observable<any> {
    return this.httpClient.post<any>(this.registroURL + 'create', register);
  }

  public update(id: number, register: Register): Observable<any> {
    return this.httpClient.put<any>(this.registroURL + `update/${id}`, register);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.registroURL + `delete/${id}`);
  }
  
  public subirFotoFrontalCredencial(archivo: File, id): Observable<HttpEvent<{}>> {
   //Observable<Register>
    let formData = new FormData();
    formData.append("archivo",archivo);
    formData.append("id",id);

    const req = new HttpRequest('POST',this.registroURL + `credencialFrontal`,formData,{
     reportProgress: true
    });
     return this.httpClient.request(req);
    /*return this.httpClient.request(req).pipe(
    map( (response: any) => response.register as Register),
    catchError( e => {
      console.error(e.error.mensaje);
      //swal(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
    );   */
  }

  public subirFotoTraseraCredencial(archivo: File, id): Observable<HttpEvent<{}>> {
   
     let formData = new FormData();
     formData.append("archivo",archivo);
     formData.append("id",id);
 
     const req = new HttpRequest('POST',this.registroURL + `credencialTrasera`,formData,{
      reportProgress: true
     });
      return this.httpClient.request(req);
     /*return this.httpClient.request(req).pipe(
     map( (response: any) => response.register as Register),
     catchError( e => {
       console.error(e.error.mensaje);
       //swal(e.error.mensaje, e.error.error, 'error');
       return throwError(e);
     })
     );   */
   }

   public getPageAllByRegister(page: number,size: number): Observable<Register> {
     return  this.httpClient.get<Register>(this.registroURL + `page?page=`+ page + `&size=` + size);
   }

 public async credencialFrontalUpload(webPath: string){
   this.loading = await this.loadingCtrl.create({
     message: 'Uploading...'
   });
   await this.loading.present();
   const blob = await fetch(webPath).then(r => r.blob());

   const formData = new FormData();
   formData.append('file', blob, `file-${this.counter++}.jpg`);
   this.httpClient.post<boolean>(this.registroURL + `upload/credencialFrontal`, formData)
   .pipe(
    catchError(e => this.handleError(e)),
    finalize(() => this.loading.dismiss())
   )
   .subscribe(ok => this.showToast(ok));
 }

 private async showToast(ok: boolean) {
  if (ok) {
    const toast = await this.toastCtrl.create({
      message: 'Upload successful',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  } else {
    const toast = await this.toastCtrl.create({
      message: 'Upload failed',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}

private handleError(error: any) {
  const errMsg = error.message ? error.message : error.toString();
  this.error = errMsg;
  return throwError(errMsg);
}
}
