import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PdfMakeWrapper, Table, Txt } from "pdfmake-wrapper";
import { ServiceService } from "src/app/Service/service.service";
import { Tipohabitacion } from '../../Modelo/tipohabitacion';

@Component({
  selector: "app-ViewTipohabitacion",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"]
})
export class ViewTipohabitacion implements OnInit{

    pdfMakerWrapper = new PdfMakeWrapper();

    tipohabitacion:Tipohabitacion = new Tipohabitacion();
    constructor(private service:ServiceService, private router:Router){}

    ngOnInit(){
      
      let id = localStorage.getItem("id");
      this.service.getTipohabitacion(id).subscribe(data=> {this.tipohabitacion=data;})

     }

     descargarPDF(){

      let id = localStorage.getItem("id");
      this.service.getTipohabitacion(id).subscribe(data=> {this.tipohabitacion=data;
      
        this.pdfMakerWrapper = new PdfMakeWrapper();

          this.pdfMakerWrapper.defaultStyle({

            fontSize: 15,

          });

          this.pdfMakerWrapper.pageSize('A4');

          this.pdfMakerWrapper.pageMargins([80, 40]);

          this.pdfMakerWrapper.header([
            new Txt('Tipo de habitación: ' + data.id).alignment('center').end
          ]);
          
          this.pdfMakerWrapper.add(  
      
            new Table([
              ['idTipohabitacion', data.id],
              ['Tipo de habitación', data.nombre],
              ['Descripción', data.descripcion],
              ['Precio', data.precio + '€']
              
            ]).widths([100, '*']).alignment('center').end
            
            );

            this.pdfMakerWrapper.create().open();
      
      })

    }

    EditTipohabitacion(tipohabitacion:Tipohabitacion):void{
      localStorage.setItem("id",tipohabitacion.id.toString());
      this.router.navigate(["EditTipohabitacion"]);
    }

    Volver(){        
      this.router.navigate(["app-getPageTipohabitacion"]);
    }
}