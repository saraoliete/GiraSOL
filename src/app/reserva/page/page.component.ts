import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Reserva } from "src/app/Modelo/reserva";
import { ServiceService } from "src/app/Service/service.service";
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

import { PdfMakeWrapper, Table } from 'pdfmake-wrapper';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

@Component({
  selector: "getPageReserva",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.scss"]
})
export class getPageReserva implements OnInit{

    reservas!:Array<Reserva>;
    totalPages!: Array<number>;

    page = 0;
    size = 4;
    order ='id';
    asc = true;

    isFirst = false;
    isLast = false;

    constructor(private service:ServiceService, private router:Router, private datePipe:DatePipe, private pdfMakerWrapper:PdfMakeWrapper){}

    ngOnInit(){

      this.cargarReservas(); 

    }

    cargarReservas(){
      this.service.getPageReserva(this.page, this.size, this.order, this.asc).subscribe
        (data=>{

          console.log(data);

          this.reservas = data.content;
          this.isFirst = data.first;
          this.isLast = data.last;
          this.totalPages = new Array(data.totalPages);

        })
        
    }

    //ordenar asc o desc
    sort():void{
      this.asc = !this.asc;
      this.cargarReservas();
    }

    //avanza pagina
    rewind():void{

      if(!this.isFirst){

        this.page--;
        this.cargarReservas();
      }
    }


    //retrocede pagina
    forward():void{

      if(!this.isLast){

        this.page++;
        this.cargarReservas();
      }
    }

    //cambia la pagina segun el numero
    setPage(page:number):void{
      
      this.page=page;
      this.cargarReservas();
    }

    //ordenar por
    setOrder(order: string): string {
      this.order = order;
      this.cargarReservas();

      return order;
    }

    descargarPDF():void{

      this.service.getPageReserva(this.page, this.size, this.order, this.asc).subscribe
        (data=>{

          console.log(data);

          this.reservas = data.content;
          this.isFirst = data.first;
          this.isLast = data.last;
          this.totalPages = new Array(data.totalPages);

          for(let item of data.content){

            this.pdfMakerWrapper = new PdfMakeWrapper();
      
            this.pdfMakerWrapper.add(
      
            new Table([
              ['id', item.id],
              ['Usuario', item.usuario.nombre + ' ' + item.usuario.apellidos],
              ['Pension', item.pension.tipo],
              ['Habitacion', item.habitacion.tipohabitacion.nombre],
              ['Cama supletoria', item.cama_supletoria],
              ['Fecha llegada', item.fecha_llegada],
              ['Fecha final', item.fecha_final],
              ['Precio total', item.precio_final + '€']
              
            ]).alignment('center').end
            
            );
      
            this.pdfMakerWrapper.create().open();
          }

        })

      


    }

    Crear():void{
      this.router.navigate(["CreateReserva"]);
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

          this.service.deleteReserva(reserva).subscribe(data=>{
          this.reservas = this.reservas.filter(p => p!==reserva)}
              )

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
      this.router.navigate(["home"]);
    }
}
