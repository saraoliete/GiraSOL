import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServiceService } from "src/app/Service/service.service";
import { Reserva } from '../../Modelo/reserva';

@Component({
  selector: "app-getPageReserva",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.scss"]
})
export class getPageReserva implements OnInit{

    reserva:Reserva[] | undefined;
    constructor(private service:ServiceService, private router:Router){}

    ngOnInit(){

        this.service.getReserva().subscribe(data=>{this.reserva=data;})

    }
}