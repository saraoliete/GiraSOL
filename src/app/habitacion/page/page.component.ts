import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServiceService } from "src/app/Service/service.service";
import { Habitacion } from '../../Modelo/habitacion';
import swal from 'sweetalert2';
import { PdfMakeWrapper, Table, Txt} from "pdfmake-wrapper";
import { StorageService } from "src/app/Service/storage.service";

@Component({
  selector: "getPageHabitacion",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.scss"]
})
export class getPageHabitacion implements OnInit{

    pdfMakerWrapper = new PdfMakeWrapper();

    habitaciones!: Array<any>;
    totalPages!: Array<number>;

    page = 0;
    size = 4;
    order ='id';
    asc = true;

    isFirst = false;
    isLast = false;

    constructor(private service:ServiceService, private storage:StorageService, private router:Router){
    }

    ngOnInit(){
      this.cargarHabitaciones();
    }
    
    esAdministrador():boolean {
      return this.storage.getCurrentSession()?.tipousuario.id == 1;
    }

    cargarHabitaciones(){
      this.service.getPageHabitacion(this.page, this.size, this.order, this.asc).subscribe
        (data=>{

          console.log(data);
          
          this.habitaciones = data.content;
          this.isFirst = data.first;
          this.isLast = data.last;
          this.totalPages = new Array(data.totalPages);

        })
        
    }

    //ordenar asc o desc
    sort():void{
      this.asc = !this.asc;
      this.cargarHabitaciones();
    }

    //avanza pagina
    rewind():void{

      if(!this.isFirst){

        this.page--;
        this.cargarHabitaciones();
      }
    }


    //retrocede pagina
    forward():void{

      if(!this.isLast){

        this.page++;
        this.cargarHabitaciones();
      }
    }

    //cambia la pagina segun el numero
    setPage(page:number):void{
      
      this.page=page;
      this.cargarHabitaciones();
    }


    //numero de cards
    setSize(size:number):void{

      this.size = size;
      this.cargarHabitaciones();
    }

    //ordenar por
    setOrder(order: string): void {
      this.order = order;
      this.cargarHabitaciones();
    }


    descargarPDF():void{

      this.service.getPageHabitacion(this.page, this.size, this.order, this.asc).subscribe
        (data=>{

          console.log(data);
          
          this.habitaciones = data.content;
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
              ['idHabitacion', item.id],
              ['Tipo de habitacion', item.tipohabitacion.nombre],
              ['Descripcion', item.tipohabitacion.descripcion],
              ['Precio', item.tipohabitacion.precio]
              
            ]).widths([100, '*']).alignment('center').end
            
            );
      
          }
          
          this.pdfMakerWrapper.create().open();
        })     


    }
  
    Editar(habitacion:Habitacion):void{
      localStorage.setItem("id",habitacion.id.toString());
      this.router.navigate(["EditHabitacion"]);
    }


    View(habitacion:Habitacion):void{
      localStorage.setItem("id", habitacion.id.toString());
      this.router.navigate(["ViewHabitacion"]);
    }

    UploadFile(){

      this.router.navigate(["UploadFile"]);
    }

    Galeria(){
      
    }

    SelectFile(){

      this.router.navigate(['GaleriaImagenes'])
      
    }

    Delete(habitacion:Habitacion){

      swal.fire({
        title: '¿Estás seguro de que quieres eliminar la habitación ' + habitacion.id + '?',
        text: '¡No podrás recuperarla si decides eliminarla!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, quiero eliminarla',
        cancelButtonText: 'No, quiero guardarla'
      }).then((result) => {
        if(result.value){

          this.service.deleteHabitacion(habitacion).subscribe(data=>{
          this.habitaciones = this.habitaciones.filter(p => p!==habitacion)}
              )

          swal.fire(
            '¡Eliminada!',
            'La habitación ' + habitacion.id + ' ha sido eliminada.',
          )
          } else if (result.dismiss === swal.DismissReason.cancel){

            swal.fire(

              'Cancelado',
              'La habitación ' + habitacion.id + ' está segura.',
            )
          }
      })

      }

    Create(){

      this.router.navigate(["CreateHabitacion"]);
    }
    

    Volver(){        
      this.router.navigate(["home"]);
    }
}
