import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Habitacion } from 'src/app/Modelo/habitacion';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
    selector: 'app-EditHabitacion',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})

export class EditHabitacion implements OnInit{

    //habitacion:Habitacion = new Habitacion();
    constructor(/**private service:ServiceService, private router:Router*/){}

    ngOnInit(){
        //this.Editar();
    }

    /**
     *  Editar(){
        let id = localStorage.getItem("id");
        this.service.getHabitacion(+id).subscribe(data=>{ this.habitacion=data;})
      }

    Guardar(habitacion:Habitacion){
        this.service.updateHabitacion(habitacion).subscribe(data=>{this.habitacion=data;
        alert("Se ha guardado con exito");
        this.router.navigate(["getPageHabitacion"]);})

    }
   
    * 
    * Cancelar(){
        //si cancela que le sagla una ventana de confirmacion
        this.router.navigate(["getPageHabitacion"]);
    }

    * 
    *  */ 
}