import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServiceService } from "src/app/Service/service.service";
import { Tipohabitacion } from '../../Modelo/tipohabitacion';
import swal from 'sweetalert2';
import { PdfMakeWrapper, Table, Txt } from "pdfmake-wrapper";

@Component({
  selector: "app-getPageTipohabitacion",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.scss"]
})
export class getPageTipohabitacion implements OnInit{

  pdfMakerWrapper = new PdfMakeWrapper();

  Tipohabitaciones!: Array<any>;
  totalPages!: Array<number>;

  page = 0;
  size = 4;
  order ='id';
  asc = true;

  isFirst = false;
  isLast = false;

  constructor(private service:ServiceService, private router:Router){
  }

  ngOnInit(){
    this.cargarTipoHabitaciones();
  }
  

  cargarTipoHabitaciones(){
    this.service.getPageTipohabitacion(this.page, this.size, this.order, this.asc).subscribe
      (data=>{

        console.log(data);
        
        this.Tipohabitaciones = data.content;
        this.isFirst = data.first;
        this.isLast = data.last;
        this.totalPages = new Array(data.totalPages);

      })
      
  }

  //ordenar asc o desc
  sort():void{
    this.asc = !this.asc;
    this.cargarTipoHabitaciones();
  }

  //avanza pagina
  rewind():void{

    if(!this.isFirst){

      this.page--;
      this.cargarTipoHabitaciones();
    }
  }


  //retrocede pagina
  forward():void{

    if(!this.isLast){

      this.page++;
      this.cargarTipoHabitaciones();
    }
  }

  //cambia la pagina segun el numero
  setPage(page:number):void{
    
    this.page=page;
    this.cargarTipoHabitaciones();
  }

  //numero de cards
  setSize(size:number):void{

    this.size = size;
    this.cargarTipoHabitaciones();
  }

  //ordenar por
  setOrder(order: string): void {
    this.order = order;
    this.cargarTipoHabitaciones();
  }

  descargarPDF():void{

    this.service.getPageTipohabitacion(this.page, this.size, this.order, this.asc).subscribe
    (data=>{

      console.log(data);
      
      this.Tipohabitaciones = data.content;
      this.isFirst = data.first;
      this.isLast = data.last;
      this.totalPages = new Array(data.totalPages);

        this.pdfMakerWrapper = new PdfMakeWrapper();

        this.pdfMakerWrapper.defaultStyle({

          fontSize: 15,

        });

        this.pdfMakerWrapper.pageSize('A4');

        this.pdfMakerWrapper.pageMargins([80, 40]);

        this.pdfMakerWrapper.header([
          new Txt('Listar habitaciones').alignment('center').end
        ]);
        
        for(let item of data.content){
        
          this.pdfMakerWrapper.add(  
    
          new Table([
            ['idTipohabitacion', item.id],
            ['Tipo de habitacion', item.nombre],
            ['Descripcion', item.descripcion],
            ['Precio', item.precio]
            
          ]).widths([100, '*']).alignment('center').end
          
          );
    
        }
        
        this.pdfMakerWrapper.create().open();
      })     


  }

    View(tipohabitacion:Tipohabitacion):void{
      localStorage.setItem("id",tipohabitacion.id.toString());
      this.router.navigate(["app-ViewTipohabitacion"]);
    }

    Editar(tipohabitacion:Tipohabitacion):void{
      localStorage.setItem("id",tipohabitacion.id.toString());
      this.router.navigate(["EditTipohabitacion"]);
    }

    Create():void{

      this.router.navigate(["app-CreateTipohabitacion"]);

    }

    Delete(tipohabitacion:Tipohabitacion){

      swal.fire({
        title: '¿Estás seguro de que quieres eliminar la habitación ' + tipohabitacion.id + '?',
        text: '¡No podrás recuperarla si decides eliminarla!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, quiero eliminarla',
        cancelButtonText: 'No, quiero guardarla'
      }).then((result) => {
        if(result.value){

          this.service.deleteTipohabitacion(tipohabitacion).subscribe(data=>{
          this.Tipohabitaciones = this.Tipohabitaciones.filter(p => p!==tipohabitacion)}
              )

          swal.fire(
            '¡Eliminado!',
            'El tipo de habitación ' + tipohabitacion.id + ' ha sido eliminado.',
          )
          } else if (result.dismiss === swal.DismissReason.cancel){

            swal.fire(

              'Cancelado',
              'El tipo de habitación ' + tipohabitacion.id + ' está seguro.',
            )
          }
      })

    }
}
