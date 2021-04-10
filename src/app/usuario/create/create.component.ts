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
        telefono:[],
        validado:[],
        activo:[]



      })

    }

    ngOnInit(){  }

  register() {
    
    let parameter = JSON.stringify(this.formCreateUser.value);
    this.service.createUser(parameter).subscribe(
    data => { 
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