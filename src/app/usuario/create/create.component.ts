//create user va a servir para registrarse
//por lo tanto cuando el usuario pinche sobre el boton registrarse le mandara a traves del routing para 
//crear el usuario

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Tipousuario } from "src/app/Modelo/tipousuario";
import { Usuario } from "src/app/Modelo/usuario";
import { ServiceService } from "src/app/Service/service.service";

@Component({
  selector: "CreateUsuario",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateUsuario implements OnInit{

    formCreateUser!: FormGroup;
    usuario:Usuario=new Usuario();
    lista!: Array<Tipousuario>;

    constructor(private service: ServiceService, private router:Router, private fomrBuilder:FormBuilder) {

      this.formCreateUser = this.fomrBuilder.group({
        nombre:["", [Validators.required, Validators.pattern("^[A-Z]([a-z]+)(\s?[A-Z]([a-z]+))*$"), Validators.minLength(3), Validators.maxLength(45)]],
        apellidos:["", Validators.required, Validators.pattern("^[A-Z]([a-z]+)(\s?[A-Z]([a-z]+))*$"), Validators.minLength(2), Validators.maxLength(36)],
        dni:["", Validators.required, Validators.pattern("^[0-9]{8}[A-Za-z]$")],
        sexo:["", Validators.required],
        edad:["", Validators.required, Validators.maxLength(3)],
        email:["", Validators.required, Validators.pattern("^\S+@\S+\.\S+$"), Validators.minLength(6), Validators.maxLength(30)],
        localidad:["", Validators.required, Validators.pattern("^[A-Z]([a-z]+)(\s?[A-Z]([a-z]+))*$")],
        nacionalidad:["", Validators.required, Validators.pattern("^[A-Z]([a-z]+)(\s?[A-Z]([a-z]+))*$")],
        telefono:["", Validators.required, Validators.pattern("^(6|7|9)[0-9]{8}$")],
        nombreusuario:["", Validators.required, Validators.pattern("^[0-9A-Za-z_.]+$"), Validators.minLength(6), Validators.maxLength(30)],
        password:["", Validators.required, Validators.pattern("^[0-9A-Za-z_.\s]+$"), Validators.minLength(8), Validators.maxLength(13)],
        tipousuario:["", Validators.required],
        token:[],
        validado:[],
        activo:[]
        



      })

    }

    ngOnInit(){ 

      this.service.getAllTipousuario().subscribe(data=> this.lista=data)
      
     }

  register() {

        this.usuario.nombreusuario = this.formCreateUser.get('nombreusuario')?.value;
        this.usuario.password = this.formCreateUser.get('password')?.value;
        this.usuario.tipousuario = this.formCreateUser.get('tipousuario')?.value;
        this.usuario.nombre = this.formCreateUser.get('nombre')?.value;
        this.usuario.apellidos = this.formCreateUser.get('apellidos')?.value;
        this.usuario.dni = this.formCreateUser.get('dni')?.value;
        this.usuario.sexo = this.formCreateUser.get('sexo')?.value;
        this.usuario.edad = this.formCreateUser.get('edad')?.value;
        this.usuario.email = this.formCreateUser.get('email')?.value;
        this.usuario.telefono = this.formCreateUser.get('telefono')?.value;
        this.usuario.localidad = this.formCreateUser.get('localidad')?.value;
        this.usuario.nacionalidad = this.formCreateUser.get('nacionalidad')?.value;
        this.usuario.token = this.formCreateUser.get('token')?.value;
        this.usuario.validado = this.formCreateUser.get('validado')?.value;
        this.usuario.activo = this.formCreateUser.get('activo')?.value;
    
    this.service.createUser(this.usuario).subscribe(
    data => { 
        
      this.usuario=data;
      console.log("usuario:" + data);

        this.router.navigate(["getPageUsuario"]);
    },
    error => {
          console.log(error);
    });
  }

  Volver(){        
    this.router.navigate(["getPageUsuario"]);
  }
}