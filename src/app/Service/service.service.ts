import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Habitacion } from '../Modelo/habitacion';
import { Reserva } from '../Modelo/reserva';
import { Usuario } from '../Modelo/usuario';
import { CookieService } from 'ngx-cookie-service';
import { Pension } from '../Modelo/pension';
import { Tipousuario } from '../Modelo/tipousuario';
import { Tipohabitacion } from '../Modelo/tipohabitacion';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {FileImg} from 'src/app/Modelo/file';
import { Login } from '../Modelo/login';

@Injectable({

    providedIn: 'root'
})

export class ServiceService {

    constructor(private http:HttpClient, private cookies:CookieService){}

    Url='http://localhost:8082/';

    //Login. check
    login(usuario: String){
        
        return this.http.post<Usuario>(this.Url + "session/", usuario,{
            headers: new HttpHeaders({
            "Content-Type": "application/json",
            "Accept": "application/json"
        }), withCredentials: true
        });
    }

    logout(){

        return this.http.delete<Usuario>(this.Url + "session/");
    }

    checkUsuario():Observable<any>{
        return this.http.get<Usuario>(this.Url + "session/", {
            
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            }),
            observe: 'response',
            responseType: 'json',
            withCredentials: true
          }).pipe(
            catchError(err=>{
              console.log('ha ocurrido un error', err);
              return throwError(err);
      
            })
          );
    }
    
    //servicio de imagenes

    uploadImagenes(file:File): Observable<HttpEvent<any>>{

        const formData: FormData = new FormData();

        formData.append('file', file);

        const req = new HttpRequest('POST', this.Url + "file/upload", formData, {
            reportProgress: true,
            responseType: 'json'
          });
      
          return this.http.request(req);
             
    }

    getImagenes(){
        return this.http.get<FileImg[]>(this.Url + 'files');
    }

    getImagen(id:Number):Observable<Blob>{
        return this.http.get(this.Url + 'file/' + id, {responseType:'blob'});
    }
    
    //Usuario
    getUsuario(id:String | null):Observable<Usuario>{
        return this.http.get<Usuario>(this.Url + "usuario/" + id);
    }
    
    createUser(usuario: Usuario){
        return this.http.post<Usuario>(this.Url + "usuario/", usuario);
    }

    updateUsuario(usuario:Usuario){
        return this.http.put<Usuario>(this.Url + "usuario/" + usuario.id, usuario, {withCredentials: true});
    }

    deleteUser(usuario:Usuario){
        return this.http.delete<Usuario>(this.Url + "usuario/" + usuario.id, {withCredentials: true});
    }

    getPageUsuario(page: number, size: number, order: string, asc: boolean): Observable<any>{
        return this.http.get<any>(this.Url + "usuario/" + "page?" + `page=${page}&size=${size}&order=${order}&asc=${asc}`);
    }

    //Tipousuario

    getTipousuario(id:String | null): Observable<Tipousuario>{
        return this.http.get<Tipousuario>(this.Url + "tipousuario/" + id);
    }

    getAllTipousuario(){
        return this.http.get<Tipousuario[]>(this.Url + "tipousuario/" + "all");
    }
    updateTipousuario(tipousuario:Tipousuario){
        return this.http.put<Tipousuario>(this.Url + "tipousuario/" + tipousuario.id, tipousuario, {withCredentials: true});
    }
    createTipousuario(tipousuario:Tipousuario){
        return this.http.post<Tipousuario>(this.Url + "tipousuario/", tipousuario, {withCredentials: true});
    }
    deleteTipousuario(tipousuario:Tipousuario){
        return this.http.delete<Tipousuario>(this.Url + "tipousuario/" + tipousuario.id, {withCredentials: true});
    }

    getPageTipousuario(page: number, size: number, order: string, asc: boolean): Observable<any>{
            return this.http.get<any>(this.Url + "tipousuario/" + "page?" + `page=${page}&size=${size}&order=${order}&asc=${asc}`);
    }

    //Habitacion
    getHabitacion(id:String | null): Observable<Habitacion>{
        return this.http.get<Habitacion>(this.Url + "habitacion/" + id);
    }

    createHabitacion(habitacion:Habitacion): Observable<Habitacion>{
        return this.http.post<Habitacion>(this.Url + "habitacion/",habitacion, {withCredentials: true});
    }

    updateHabitacion(habitacion:Habitacion){
        return this.http.put<Habitacion>(this.Url + "habitacion/" + habitacion.id, habitacion, {withCredentials: true});
    }

    deleteHabitacion(habitacion:Habitacion){
        return this.http.delete<Habitacion>(this.Url + "habitacion/" + habitacion.id, {withCredentials: true});
    }

    getPageHabitacion(page: number, size: number, order: string, asc: boolean): Observable<any>{
        return this.http.get<any>(this.Url + "habitacion/" + "page?" + `page=${page}&size=${size}&order=${order}&asc=${asc}`);
    }

    //tipohabitacion

    getTipohabitacion(id:String | null): Observable<Tipohabitacion>{
        return this.http.get<Tipohabitacion>(this.Url + "tipohabitacion/" + id);
    }

    getAllTipohabitacion(){
        return this.http.get<Tipohabitacion[]>(this.Url + "tipohabitacion/" + "all");
    }

    updateTipohabitacion(tipohabitacion:Tipohabitacion){
            return this.http.put<Tipohabitacion>(this.Url + "tipohabitacion/" + tipohabitacion.id, tipohabitacion, {withCredentials: true});
    }

    createTipohabitacion(tipohabitacion:Tipohabitacion){
        return this.http.post<Tipohabitacion>(this.Url + "tipohabitacion/" + tipohabitacion.id, tipohabitacion, {withCredentials: true});
    }

    deleteTipohabitacion(tipohabitacion:Tipohabitacion){
        return this.http.delete<Tipohabitacion>(this.Url + "tipohabitacion/" + tipohabitacion.id, {withCredentials: true});
    }

    getPageTipohabitacion(page: number, size: number, order: string, asc: boolean): Observable<any>{
            return this.http.get<any>(this.Url + "tipohabitacion/" + "page?" + `page=${page}&size=${size}&order=${order}&asc=${asc}`);
    }

    //Pension
    getPension(id:String | null): Observable<Pension>{
        return this.http.get<Pension>(this.Url + "pension/" + id);
    }

    getAllPension(){
        return this.http.get<Pension[]>(this.Url + "pension/" + "all");
    }

    createPension(pension:Pension): Observable<Pension>{
        return this.http.post<Pension>(this.Url + "pension/", pension, {withCredentials: true});
    }

    updatePension(pension:Pension){
        return this.http.put<Pension>(this.Url + "pension/" + pension.id, pension, {withCredentials: true});
    }

    deletePension(pension:Pension){
        return this.http.delete<Pension>(this.Url + "pension/" + pension.id, {withCredentials: true});
    }

    getPagePension(page: number, size: number, order: string, asc: boolean): Observable<any>{
        return this.http.get<any>(this.Url + "pension/" + "page?" + `page=${page}&size=${size}&order=${order}&asc=${asc}`);
    }

    
    //Reserva
    getReserva(id:String | null): Observable<Reserva>{
        return this.http.get<Reserva>(this.Url + "reserva/" + id);
    }

    createReserva(reserva:Reserva): Observable<Reserva>{

        return this.http.post<Reserva>(this.Url + "reserva/", reserva);
            
    }

    updateReserva(reserva:Reserva){
        return this.http.put<Reserva>(this.Url + "reserva/" + reserva.id, reserva, {withCredentials: true});
    }

    deleteReserva(reserva:Reserva){
        return this.http.delete<Reserva>(this.Url + "reserva/" + reserva.id, {withCredentials: true});
    }

    getPageReserva(page: number, size: number, order: string, asc: boolean):Observable<any>{
        return this.http.get<any>(this.Url + "reserva/" + "page?" + `page=${page}&size=${size}&order=${order}&asc=${asc}`);
    }

    getPageReservaByUserId(page: number, size: number, order: string, asc: boolean, id:Number):Observable<any>{
        return this.http.get<any>(this.Url + "reserva/" + "/pagexusuario/" + id + "?" + `page=${page}&size=${size}&order=${order}&asc=${asc}`);
    }

}