import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServiceService } from "src/app/Service/service.service";
import { Reserva } from '../../Modelo/reserva';

@Component({
  selector: "app-CreateReserva",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateReserva implements OnInit{

    reserva:Reserva[] | undefined;
    constructor(private service:ServiceService, private router:Router){}

    ngOnInit(){}

    CrearReserva(reserva:Reserva){
        this.service.createReserva(reserva).subscribe(data=>{
            alert("Reserva creada con exito.");
            this.router.navigate(["crear"]);
        })
    }
}