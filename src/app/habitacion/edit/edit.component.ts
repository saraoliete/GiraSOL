import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Habitacion } from 'src/app/Modelo/habitacion';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
    selector: 'app-EditHabitacion',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})

export class EditHabitacion implements OnInit{

    habitacion:Habitacion = new Habitacion();
    formEditHabitacion!:FormGroup;
    constructor(private service:ServiceService, private router:Router, private formBuilder:FormBuilder){}

    ngOnInit(){

         this.formEditHabitacion = this.formBuilder.group({
            id_tipohabitacion:[]
      
          })
        this.EditHabitacion();
    }

    EditHabitacion(){
        let id: Number = this.habitacion.idhabitacion!;
        localStorage.getItem("id");
        this.service.getHabitacion(+id).subscribe(data=>{ this.habitacion=data;})
      }

    Guardar(){
        let parameter = JSON.stringify(this.formEditHabitacion.value);
        this.service.updateHabitacion(parameter).subscribe(data=>{this.habitacion=data;
        alert("Se ha guardado con exito");
        this.router.navigate(["getPageHabitacion"]);})

    }
}