//create user va a servir para registrarse
//por lo tanto cuando el usuario pinche sobre el boton registrarse le mandara a traves del routing para 
//crear el usuario

import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Usuario } from "src/app/Modelo/usuario";
import { ServiceService } from "src/app/Service/service.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class CreateUsuario {

    usuario:Usuario = new Usuario();
    
    constructor(public service: ServiceService, public router:Router) {}

  register() {
    const user = { idusuario: this.usuario.idusuario, nombreusuario:this.usuario.nombreusuario,
    password:this.usuario.password, tipousuario:this.usuario.tipousuario, nombre:this.usuario.nombre, apellidos:this.usuario.apellidos,
    dni:this.usuario.dni, edad:this.usuario.edad, email:this.usuario.email, localidad:this.usuario.localidad, telefono: this.usuario.telefono,
    token:this.usuario.token, validado:this.usuario.validado, activo:this.usuario.activo};
    this.service.createUser(user).subscribe(
    data => { 
        this.service.setToken(data.token);
        this.router.navigate(["login"]);
    },
    error => {
          console.log(error);
    });
  }
}