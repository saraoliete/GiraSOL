import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServiceService } from "src/app/Service/service.service";
import { Tipousuario } from '../../Modelo/tipousuario';

@Component({
  selector: "app-ViewTipousuario",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"]
})
export class ViewTipousuario implements OnInit{

    tipousuario:Tipousuario = new Tipousuario();
    constructor(private service:ServiceService, private router:Router){}

    ngOnInit(){
      this.View();
     }

    View(){
      let id:Number = this.tipousuario.id_tipousuario;
      localStorage.getItem("id");
      this.service.getTipousuario(+id).subscribe(data=>{ this.tipousuario=data;})
    }

    //funcion volver
}