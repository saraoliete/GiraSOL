import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServiceService } from "src/app/Service/service.service";
import { Habitacion } from '../../Modelo/habitacion';

@Component({
  selector: "app-getPageHabitacion",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.scss"]
})
export class getPageHabitacion implements OnInit{

    //habitacion:Habitacion[] | undefined;
    constructor(/**private service:ServiceService, private router:Router*/){}

    ngOnInit(){
      //  this.service.getPageHabitacion().subscribe(data=>{this.habitacion=data;})

    }

    /**
     *Editar(habitacion:Habitacion):void{
      localStorage.setItem("id",habitacion.idhabitacion.toString());
      this.router.navigate(["EditHabitacion"]);
    }

    Delete(habitacion:Habitacion):void{
      
      this.service.deleteHabitacion(habitacion).subscribe(data=>{this.habitacion=this.habitacion?.filter(h=>h!==habitacion);
      alert("Habitacion eliminada correctamente"); })
      this.router.navigate(["DeleteHabitacion"]);
    }
    */
}
