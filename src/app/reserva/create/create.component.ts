//create user va a servir para registrarse
//por lo tanto cuando el usuario pinche sobre el boton registrarse le mandara a traves del routing para 
//crear el usuario

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Usuario } from "src/app/Modelo/usuario";
import { ServiceService } from "src/app/Service/service.service";

@Component({
  selector: "app-CreateReserva",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateReserva implements OnInit{

    formCreateReserva!: FormGroup;

    constructor(private service: ServiceService, private router:Router, private fomrBuilder:FormBuilder) {

      this.formCreateReserva = this.fomrBuilder.group({
        usuario:[],
        pension:[],
        habitacion:[],
        cama_supletoria:[],
        fecha_llegada:[],
        fecha_final:[],
        precio_final:[]

      })

    }

    ngOnInit(){  }

  CrearReserva() {
    let parameter = JSON.stringify(this.formCreateReserva.value);
    this.service.createReserva(parameter).subscribe(
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