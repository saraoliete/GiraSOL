import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PdfMakeWrapper, Table, Txt } from "pdfmake-wrapper";
import { ServiceService } from "src/app/Service/service.service";
import { Pension } from '../../Modelo/pension';

@Component({
  selector: "ViewPension",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"]
})
export class ViewPension implements OnInit{

  pdfMakerWrapper = new PdfMakeWrapper();

    pension:Pension = new Pension();
    constructor(private service:ServiceService, private router:Router){}

    ngOnInit(){
      let id= localStorage.getItem("id");
      this.service.getPension(id).subscribe(data=>{ this.pension=data;});
     }

     descargarPDF(){

      let id= localStorage.getItem("id");
      this.service.getPension(id).subscribe(data=>{ this.pension=data;
      
        this.pdfMakerWrapper = new PdfMakeWrapper();

          this.pdfMakerWrapper.defaultStyle({

            fontSize: 15,

          });

          this.pdfMakerWrapper.pageSize('A4');

          this.pdfMakerWrapper.pageMargins([80, 40]);

          this.pdfMakerWrapper.header([
            new Txt('Pensión ' + data.id).alignment('center').end
          ]);
          
          this.pdfMakerWrapper.add(  
      
            new Table([
              ['idPension', data.id],
              ['Tipo de pensión', data.tipo],
              ['Descripcion', data.descripcion],
              ['Precio', data.precio]
              
            ]).widths([100, '*']).alignment('center').end
            
            );

            this.pdfMakerWrapper.create().open();
      
      })

    }

    EditPension(pension:Pension):void{
      localStorage.setItem("id",pension.id.toString());
      this.router.navigate(["EditPension"]);
    }

    Volver(){        
      this.router.navigate(["getPagePension"]);
    }
}