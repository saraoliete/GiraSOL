import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServiceService } from "src/app/Service/service.service";
import { Tipohabitacion } from '../../Modelo/tipohabitacion';

@Component({
  selector: "app-getPageTipohabitacion",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.scss"]
})
export class getPageTipohabitacion implements OnInit{

    tipohabitacion!:Tipohabitacion[];
    constructor(private service:ServiceService, private router:Router){}

    ngOnInit(){
      this.service.getPageTipohabitacion().subscribe(data=>{this.tipohabitacion=data;})

    }

    View(tipohabitacion:Tipohabitacion):void{
      localStorage.setItem("id",tipohabitacion.id.toString());
      this.router.navigate(["ViewTipohabitacion"]);
    }

    Editar(tipohabitacion:Tipohabitacion):void{
      localStorage.setItem("id",tipohabitacion.id.toString());
      this.router.navigate(["EditTipohabitacion"]);
    }
}
