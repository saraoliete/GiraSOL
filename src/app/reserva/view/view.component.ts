import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServiceService } from "src/app/Service/service.service";
import { Reserva } from '../../Modelo/reserva';

@Component({
  selector: "app-ViewReserva",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"]
})
export class ViewReserva implements OnInit{

    reserva:Reserva[] | undefined;
    constructor(private service:ServiceService, private router:Router){}

    ngOnInit(){

        this.service.getReserva().subscribe(data=>{this.reserva=data;})

    }
}