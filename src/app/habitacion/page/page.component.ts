import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServiceService } from "src/app/Service/service.service";
import { Habitacion } from '../../Modelo/habitacion';
import swal from 'sweetalert2';

@Component({
  selector: "getPageHabitacion",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.scss"]
})
export class getPageHabitacion implements OnInit{

    habitaciones!: Array<any>;
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
      this.cargarHabitaciones();
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

    //ordenar por
    setOrder(order: string): void {
      this.order = order;
      this.cargarHabitaciones();
    }
  
    Editar(habitacion:Habitacion):void{
      localStorage.setItem("id",habitacion.id.toString());
      this.router.navigate(["EditHabitacion"]);
    }


    View(habitacion:Habitacion):void{
      localStorage.setItem("id", habitacion.id.toString());
      this.router.navigate(["ViewHabitacion"]);
    }

    UpdateFile(){

      this.router.navigate(["UpdateFile"]);
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
