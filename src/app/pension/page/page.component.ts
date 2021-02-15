import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServiceService } from "src/app/Service/service.service";
import { Pension } from '../../Modelo/pension';

@Component({
  selector: "app-getPagePension",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.scss"]
})
export class getPagePension implements OnInit{

    pension!:Pension[];
    constructor(private service:ServiceService, private router:Router){}

    ngOnInit(){
      this.service.getPagePension().subscribe(data=>{this.pension=data;})

    }

    View(pension:Pension):void{
      localStorage.setItem("id",pension.idpension.toString());
      this.router.navigate(["ViewPension"]);
    }

    Editar(pension:Pension):void{
      localStorage.setItem("id",pension.idpension.toString());
      this.router.navigate(["EditPension"]);
    }
}
