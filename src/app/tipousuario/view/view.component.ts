import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PdfMakeWrapper, Table, Txt } from "pdfmake-wrapper";
import { ServiceService } from "src/app/Service/service.service";
import { Tipousuario } from '../../Modelo/tipousuario';

@Component({
  selector: "app-ViewTipousuario",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"]
})
export class ViewTipousuario implements OnInit{

  pdfMakerWrapper = new PdfMakeWrapper();

  tipousuario:Tipousuario = new Tipousuario();
  constructor(private service:ServiceService, private router:Router){}

  ngOnInit(){
    
    let id = localStorage.getItem("id");
    this.service.getTipousuario(id).subscribe(data=> {this.tipousuario=data;})

   }

   descargarPDF(){

    let id = localStorage.getItem("id");
    this.service.getTipousuario(id).subscribe(data=> {this.tipousuario=data;
    
      this.pdfMakerWrapper = new PdfMakeWrapper();

        this.pdfMakerWrapper.defaultStyle({

          fontSize: 15,

        });

        this.pdfMakerWrapper.pageSize('A4');

        this.pdfMakerWrapper.pageMargins([80, 40]);

        this.pdfMakerWrapper.header([
          new Txt('Tipo de usuario: ' + data.id).alignment('center').end
        ]);
        
        this.pdfMakerWrapper.add(  
    
          new Table([
            ['idTipousuario', data.id],
            ['Tipo de usuario', data.nombre]
            
          ]).widths([100, '*']).alignment('center').end
          
          );

          this.pdfMakerWrapper.create().open();
    
    })

  }

  EditTipousuario(tipousuario:Tipousuario):void{
    localStorage.setItem("id",tipousuario.id.toString());
    this.router.navigate(["app-EditTipousuario"]);
  }

  Volver(){        
    this.router.navigate(["app-getPageTipousuario"]);
  }
}