import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServiceService } from "src/app/Service/service.service";
import { Reserva } from '../../Modelo/reserva';
import swal from 'sweetalert2';
import { PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

PdfMakeWrapper.setFonts(pdfFonts);

@Component({
  selector: "ViewReserva",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"]
})
export class ViewReserva implements OnInit{

    reserva:Reserva = new Reserva();
    constructor(private service:ServiceService, private router:Router, private pdfMakerWrapper:PdfMakeWrapper){
    }

    ngOnInit(){
      let id= localStorage.getItem("id");
      this.service.getReserva(id).subscribe(data=>{ this.reserva=data;});
     }

     descargarPDF(){

      let id= localStorage.getItem("id");
      this.service.getReserva(id).subscribe(data=>{ this.reserva=data;
      
        this.pdfMakerWrapper = new PdfMakeWrapper();

          this.pdfMakerWrapper.defaultStyle({

            fontSize: 15,

          });

          this.pdfMakerWrapper.pageSize('A4');

          this.pdfMakerWrapper.pageMargins([80, 40]);

          this.pdfMakerWrapper.header([
            new Txt('Reserva ' + data.id).alignment('center').end
          ]);
          
          this.pdfMakerWrapper.add(  
      
            new Table([
              ['idReserva', data.id],
              ['Usuario', data.usuario.nombre + ' ' + data.usuario.apellidos],
              ['Pension', data.pension.tipo],
              ['Habitacion', data.habitacion.tipohabitacion.nombre],
              ['Cama supletoria', this.camaSupletoria()],
              ['Fecha llegada', data.fecha_llegada],
              ['Fecha final', data.fecha_final],
              ['Precio total', data.precio_final]
              
            ]).widths([100, '*']).alignment('center').end
            
            );

            this.pdfMakerWrapper.create().open();
      
      })

    }

    camaSupletoria():String{

      let SiNo:String = '';

      if(this.reserva.cama_supletoria == false){

          SiNo='No';

        }else if(this.reserva.cama_supletoria==true){

          SiNo='Sí';
        }
      
      return SiNo;
    }

    Editar(reserva:Reserva):void{
      localStorage.setItem("id", reserva.id.toString());
      this.router.navigate(["EditReserva"]);
    }

    View(reserva:Reserva):void{
      localStorage.setItem("id", reserva.id.toString());
      this.router.navigate(["ViewReserva"]);
    }

    Delete(reserva:Reserva){

      console.log(reserva.id);

      swal.fire({
        title: '¿Estás seguro de que quieres eliminar la habitación ' + reserva.id + '?',
        text: '¡No podrás recuperarla si decides eliminarla!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, quiero eliminarla',
        cancelButtonText: 'No, quiero guardarla'
      }).then((result) => {
        if(result.value){

          this.service.deleteReserva(reserva).subscribe()

              ;

          swal.fire(
            '¡Eliminada!',
            'La habitación ' + reserva.id + ' ha sido eliminada.',
          )
          } else if (result.dismiss === swal.DismissReason.cancel){

            swal.fire(

              'Cancelado',
              'La habitación ' + reserva.id + ' está segura.',
            )
          }
      })

      }

    Volver(){        
      this.router.navigate(["getPageReserva"]);
    }
}