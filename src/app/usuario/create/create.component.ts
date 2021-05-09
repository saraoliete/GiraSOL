//create user va a servir para registrarse
//por lo tanto cuando el usuario pinche sobre el boton registrarse le mandara a traves del routing para 
//crear el usuario

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Usuario } from "src/app/Modelo/usuario";
import { ServiceService } from "src/app/Service/service.service";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateUsuario implements OnInit{

    formCreateUser!: FormGroup;
    usuario:Usuario=new Usuario();

    constructor(private service: ServiceService, private router:Router, private fomrBuilder:FormBuilder) {

      this.formCreateUser = this.fomrBuilder.group({
        tipousuario:[],
        nombreusuario:[],
        password:[],
        nombre:[],
        apellidos:[],
        dni:[],
        sexo:[],
        edad:[],
        email:[],
        localidad:[],
        nacionalidad:[],
        telefono:[],
        validado:[],
        activo:[]



      })

    }

    ngOnInit(){  }

  register() {

        this.usuario.nombre = this.formCreateUser.get('nombre')?.value;
        this.usuario.apellidos = this.formCreateUser.get('apellidos')?.value;
        this.usuario.dni = this.formCreateUser.get('dni')?.value;
        this.usuario.sexo = this.formCreateUser.get('sexo')?.value;
        this.usuario.edad = this.formCreateUser.get('edad')?.value;
        this.usuario.email = this.formCreateUser.get('email')?.value;
        this.usuario.telefono = this.formCreateUser.get('telefono')?.value;
        this.usuario.localidad = this.formCreateUser.get('localidad')?.value;
        this.usuario.nacionalidad = this.formCreateUser.get('nacionalidad')?.value;
        this.usuario.nombreusuario = this.formCreateUser.get('nombreusuario')?.value;
        this.usuario.password = this.formCreateUser.get('password')?.value;
    
    this.service.createUser(this.usuario).subscribe(
    data => { 
        
        this.usuario=data;
        this.router.navigate(["home"]);
    },
    error => {
          console.log(error);
    });
  }

  Volver(){        
    this.router.navigate(["home"]);
  }
}