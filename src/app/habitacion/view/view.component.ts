import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServiceService } from "src/app/Service/service.service";
import { Habitacion } from '../../Modelo/habitacion';

@Component({
  selector: "ViewHabitacion",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"]
})
export class ViewHabitacion implements OnInit{

    habitacion:Habitacion = new Habitacion();
    constructor(private service:ServiceService, private router:Router){}

    ngOnInit(){

      this.View();
    }

    View(){
      
      let id= localStorage.getItem("id");
      this.service.getHabitacion(id).subscribe(data=>{ this.habitacion=data;})
    }

    EditHabitacion(habitacion:Habitacion):void{
      localStorage.setItem("id",habitacion.id.toString());
      this.router.navigate(["EditHabitacion"]);
    }

    Volver(){        
      this.router.navigate(["getPageHabitacion"]);
    }
}