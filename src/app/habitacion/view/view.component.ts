import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PdfMakeWrapper, Table, Txt } from "pdfmake-wrapper";
import { ServiceService } from "src/app/Service/service.service";
import { StorageService } from "src/app/Service/storage.service";
import { Habitacion } from '../../Modelo/habitacion';

@Component({
  selector: "ViewHabitacion",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"]
})
export class ViewHabitacion implements OnInit{

  pdfMakerWrapper = new PdfMakeWrapper();

    habitacion:Habitacion = new Habitacion();
    constructor(private service:ServiceService, private storage:StorageService, private router:Router){}

    ngOnInit(){

      this.View();
    }

    esAdministrador():boolean {
      return this.storage.getCurrentSession()?.tipousuario.id == 1;
    }

    View(){
      
      let id= localStorage.getItem("id");
      this.service.getHabitacion(id).subscribe(data=>{ this.habitacion=data; });
    }

    descargarPDF(){

      let id= localStorage.getItem("id");
      this.service.getHabitacion(id).subscribe(data=>{ this.habitacion=data;
      
        this.pdfMakerWrapper = new PdfMakeWrapper();

          this.pdfMakerWrapper.defaultStyle({

            fontSize: 15,

          });

          this.pdfMakerWrapper.pageSize('A4');

          this.pdfMakerWrapper.pageMargins([80, 40]);

          this.pdfMakerWrapper.header([
            new Txt('Habitación ' + data.id).alignment('center').end
          ]);
          
          this.pdfMakerWrapper.add(  
      
            new Table([
              ['idHabitacion', data.id],
              ['Tipo de habitacion', data.tipohabitacion.nombre],
              ['Descripcion', data.tipohabitacion.descripcion],
              ['Precio', data.tipohabitacion.precio]
              
            ]).widths([100, '*']).alignment('center').end
            
            );

            this.pdfMakerWrapper.create().open();
      
      })

    }

    EditHabitacion(habitacion:Habitacion):void{
      localStorage.setItem("id",habitacion.id.toString());
      this.router.navigate(["EditHabitacion"]);
    }

    Volver(){        
      this.router.navigate(["getPageHabitacion"]);
    }
}