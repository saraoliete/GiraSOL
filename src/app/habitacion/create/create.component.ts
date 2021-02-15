//create user va a servir para registrarse
//por lo tanto cuando el usuario pinche sobre el boton registrarse le mandara a traves del routing para 
//crear el usuario

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Habitacion } from "src/app/Modelo/habitacion";
import { ServiceService } from "src/app/Service/service.service";

@Component({
  selector: "app-CreateHabitacion",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateHabitacion implements OnInit{

    formCreateHabitacion!: FormGroup;
    habitacion:Habitacion=new Habitacion();

    constructor(private service: ServiceService, private router:Router, private fomrBuilder:FormBuilder) {

      this.formCreateHabitacion = this.fomrBuilder.group({
        id_tipohabitacion:[]
      })

    }

    ngOnInit(){  }

  createHabitacion() {
    
        let parameter = JSON.stringify(this.formCreateHabitacion.value);
        this.service.createHabitacion(parameter).subscribe(data=>{this.habitacion=data;
        alert("Se ha creado con exito");
        this.router.navigate(["getPageHabitacion"]);})
  }
}