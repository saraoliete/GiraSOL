//create user va a servir para registrarse
//por lo tanto cuando el usuario pinche sobre el boton registrarse le mandara a traves del routing para 
//crear el usuario

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Habitacion } from "src/app/Modelo/habitacion";
import { Tipohabitacion } from "src/app/Modelo/tipohabitacion";
import { ServiceService } from "src/app/Service/service.service";
import swal from 'sweetalert2';

@Component({
  selector: "CreateHabitacion",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateHabitacion implements OnInit{

    formCreateHabitacion!: FormGroup;
    habitacion:Habitacion=new Habitacion();
    lista!: Array<Tipohabitacion>;

    constructor(private service: ServiceService, private router:Router, private fomrBuilder:FormBuilder) {

      this.formCreateHabitacion = this.fomrBuilder.group({
        tipohabitacion:[]
      })

    }

    ngOnInit(){ 
      this.service.getAllTipohabitacion().subscribe(data=> this.lista=data)
     }


  
  createHabitacion() {
    console.log("createHabitacion");
    this.habitacion.tipohabitacion.id = this.formCreateHabitacion.get('tipohabitacion')?.value;
     this.service.createHabitacion(this.habitacion).subscribe(data => {
      this.habitacion = data;
      this.router.navigate(["getPageHabitacion"]);
      
      swal.fire({
        title: '¡Enhorabuena!',
        text: 'La habitación ha sido creada correctamente.',
        icon: 'success'
      });
      
    }, error => swal.fire({
      title: 'Error al crear en Pensión',
      text: error,
      icon: 'error'
    }));

  }

  Volver(){        
    this.router.navigate(["getPageHabitacion"]);
}
}