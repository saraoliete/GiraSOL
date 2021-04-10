import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServiceService } from "src/app/Service/service.service";
import { Pension } from '../../Modelo/pension';

@Component({
  selector: "ViewPension",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"]
})
export class ViewPension implements OnInit{

    pension:Pension = new Pension();
    constructor(private service:ServiceService, private router:Router){}

    ngOnInit(){
      let id= localStorage.getItem("id");
      this.service.getPension(id).subscribe(data=>{ this.pension=data;});
     }

    EditPension(pension:Pension):void{
      localStorage.setItem("id",pension.id.toString());
      this.router.navigate(["EditPension"]);
    }

    Volver(){        
      this.router.navigate(["getPagePension"]);
    }
}