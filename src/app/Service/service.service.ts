import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Habitacion } from '../Modelo/habitacion';
import { Reserva } from '../Modelo/reserva';
//import { LogoutComponent } from '../logout/logout.component';
import { Usuario } from '../Modelo/usuario';
import { CookieService } from 'ngx-cookie-service';
import { Pension } from '../Modelo/pension';
import { Tipousuario } from '../Modelo/tipousuario';
import { Tipohabitacion } from '../Modelo/tipohabitacion';

@Injectable({

    providedIn: 'root'
})

export class ServiceService {

    constructor(private http:HttpClient, private cookies:CookieService){}

    UrlHabitacion='http://localhost:8082/habitacion/';
    UrlTipohabitacion='http://localhost:8082/tipohabitacion/';
    UrlReserva='http://localhost:8082/reserva/';
    UrlPension='http://localhost:8082/pension/';
    UrlSession='http://localhost:8082/session/';
    UrlUsuario='http://localhost:8082/usuario/';
    UrlTipousuario='http://localhost:8082/tipousuario/';

    //Login, Logout, Register
    login(usuario: string){
        return this.http.post<Usuario>(this.UrlSession, usuario);
    }

    logout(){
        this.cookies.delete("token");
    }

    //servicio de cookies
    setToken(token:string){
        this.cookies.set("token",token);
    }

    getToken(){
        return this.cookies.get("token");
    }

    
    //Usuario
    getUsuario(id:Number){
        return this.http.get<Usuario>(this.UrlUsuario + id);
    }
    
    createUser(usuario: string){
        return this.http.post<Usuario>(this.UrlUsuario, usuario);
    }

    updateUsuario(usuario:String){
        return this.http.put<Usuario>(this.UrlUsuario + usuario, usuario);
    }

    getPageUsuario(){
        return this.http.get<Usuario[]>(this.UrlUsuario + "page");
    }

    //Tipousuario

    getTipousuario(id:Number){
        return this.http.get<Tipousuario>(this.UrlTipousuario + id);
    }

    getPageTipousuario(){
            return this.http.get<Tipousuario[]>(this.UrlTipousuario + "page");
        }

    //Habitacion
    getHabitacion(id:Number){
        return this.http.get<Habitacion>(this.UrlHabitacion + id);
    }

    createHabitacion(habitacion:string){
        return this.http.post<Habitacion>(this.UrlHabitacion,habitacion);
    }

    updateHabitacion(habitacion:String){
        return this.http.put<Habitacion>(this.UrlHabitacion + habitacion, habitacion);
    }

    deleteHabitacion(habitacion:Habitacion){
        return this.http.delete<Habitacion>(this.UrlHabitacion + habitacion.idhabitacion);
    }

    getPageHabitacion(){
        return this.http.get<Habitacion[]>(this.UrlHabitacion + "page");
    }

    //tipohabitacion

    getTipohabitacion(id:Number){
        return this.http.get<Tipohabitacion>(this.UrlTipohabitacion + id);
    }

    updateTipohabitacion(tipohabitacion:String){
            return this.http.put<Tipohabitacion>(this.UrlTipohabitacion + tipohabitacion, tipohabitacion);
    }

    getPageTipohabitacion(){
            return this.http.get<Tipohabitacion[]>(this.UrlTipohabitacion + "page");
    }

    //Pension
    getPension(id:Number){
        return this.http.get<Pension>(this.UrlPension + id);
    }

    updatePension(pension:String){
        return this.http.put<Pension>(this.UrlPension + pension, pension);
    }

    getPagePension(){
        return this.http.get<Pension[]>(this.UrlPension + "page");
    }

    
    //Reserva
    getReserva(){
        return this.http.get<Reserva[]>(this.UrlReserva);
    }

    createReserva(reserva:Reserva){
        return this.http.post<Reserva>(this.UrlReserva, reserva);
    }

}