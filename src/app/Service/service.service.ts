import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Habitacion } from '../Modelo/habitacion';
import { Reserva } from '../Modelo/reserva';
import { Login } from '../Modelo/login';
//import { LogoutComponent } from '../logout/logout.component';
import { Usuario } from '../Modelo/usuario';
import { CookieService } from 'ngx-cookie-service';

@Injectable({

    providedIn: 'root'
})

export class ServiceService {

    constructor(private http:HttpClient, private cookies:CookieService){}

    UrlHabitacion='http://localhost:8082/habitacion/';
    UrlReserva='http://localhost:8082/reserva/';
    UrlSession='http://localhost:8082/session/';
    UrlUsuario='http://localhost:8082/usuario/';

    //Login, Logout, Register
    login(Login: Login){
        return this.http.post<Login>(this.UrlSession + "/", Login);
    }

    //falta crear clase
    logout(LogoutComponent: LogoutComponent){
       this.cookies.delete("token");
    }

    createUser(usuario: Usuario){
        return this.http.post<Usuario>(this.UrlUsuario + "/", usuario);
    }

    //servicio de cookies
    setToken(token:string){
        this.cookies.set("token",token);
    }

    getToken(){
        return this.cookies.get("token");
    }

    //Habitacion
    getHabitacion(id:number){
        return this.http.get<Habitacion>(this.UrlHabitacion + "/" + id);
    }

    createHabitacion(habitacion:Habitacion){
        return this.http.post<Habitacion>(this.UrlHabitacion + "/",habitacion);
    }

    updateHabitacion(habitacion:Habitacion){
        return this.http.put<Habitacion>(this.UrlHabitacion + "/" + habitacion.idhabitacion,habitacion);
    }

    deleteHabitacion(habitacion:Habitacion){
        return this.http.delete<Habitacion>(this.UrlHabitacion + "/" + habitacion.idhabitacion);
    }

    getPageHabitacion(){
        return this.http.get<Habitacion[]>(this.UrlHabitacion + "/");
    }

    
    //Reserva
    getReserva(){
        return this.http.get<Reserva[]>(this.UrlReserva);
    }

    createReserva(reserva:Reserva){
        return this.http.post<Reserva>(this.UrlReserva,reserva);
    }

}