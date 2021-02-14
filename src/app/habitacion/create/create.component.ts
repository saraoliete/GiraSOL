import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServiceService } from "src/app/Service/service.service";
import { Habitacion } from '../../Modelo/habitacion';

@Component({
  selector: "app-CreateHabitacion",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateHabitacion implements OnInit{

    habitacion:Habitacion[] | undefined;
    constructor(private service:ServiceService, private router:Router){}

    ngOnInit(){}

    CrearHabitacion(habitacion:Habitacion){
        this.service.createHabitacion(habitacion).subscribe(data=>{
            alert("Habitacion creada con exito.");
            this.router.navigate(["CreateHabitacion"]);
        })
    }
}