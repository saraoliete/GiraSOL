import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Reserva } from "src/app/Modelo/reserva";
import { ServiceService } from "src/app/Service/service.service";

@Component({
  selector: "app-getPageReserva",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.scss"]
})
export class getPageReserva implements OnInit{

    reserva!:Array<any>;
    constructor(private service:ServiceService, private router:Router){}

    ngOnInit(){
      this.service.getPageReserva().subscribe((data: any)=>{
        this.reserva = data.content;
        console.log(data);
      })  

    }

    CrearReserva():void{
      this.router.navigate(["CreateReserva"]);
    }

    Delete(reserva:Reserva):void{
      this.service.deleteReserva(reserva).subscribe(data=>{this.reserva=this.reserva?.filter(r=>r!==reserva);
        alert("Reserva eliminada correctamente"); })
        this.router.navigate(["getPageReserva"]);
    }

    Volver(){        
      this.router.navigate(["home"]);
    }
}
