import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServiceService } from "src/app/Service/service.service";
import { Tipohabitacion } from '../../Modelo/tipohabitacion';

@Component({
  selector: "app-ViewTipohabitacion",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"]
})
export class ViewTipohabitacion implements OnInit{

    tipohabitacion:Tipohabitacion = new Tipohabitacion();
    constructor(private service:ServiceService, private router:Router){}

    ngOnInit(){
      this.View();
     }

    View(){
      let id:Number = this.tipohabitacion.id_tipohabitacion;
      localStorage.getItem("id");
      this.service.getTipohabitacion(+id).subscribe(data=>{ this.tipohabitacion=data;})
    }

    EditTipohabitacion(tipohabitacion:Tipohabitacion):void{
      localStorage.setItem("id",tipohabitacion.id_tipohabitacion.toString());
      this.router.navigate(["EditTipohabitacion"]);
    }
}