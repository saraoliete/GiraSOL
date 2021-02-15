import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServiceService } from "src/app/Service/service.service";
import { Tipousuario } from '../../Modelo/tipousuario';

@Component({
  selector: "app-getPageTipousuario",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.scss"]
})
export class getPageTipousuario implements OnInit{

    tipousuario!:Tipousuario[];
    constructor(private service:ServiceService, private router:Router){}

    ngOnInit(){
      this.service.getPageTipousuario().subscribe(data=>{this.tipousuario=data;})

    }

    View(tipousuario:Tipousuario):void{
      localStorage.setItem("id",tipousuario.id_tipousuario.toString());
      this.router.navigate(["ViewTipousuario"]);
    }
}
