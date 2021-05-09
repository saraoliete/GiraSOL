import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServiceService } from "src/app/Service/service.service";
import { Reserva } from '../../Modelo/reserva';
import swal from 'sweetalert2';

@Component({
  selector: "ViewReserva",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"]
})
export class ViewReserva implements OnInit{

    reserva:Reserva = new Reserva();
    constructor(private service:ServiceService, private router:Router){}

    ngOnInit(){
      let id= localStorage.getItem("id");
      this.service.getReserva(id).subscribe(data=>{ this.reserva=data;});
     }

    Editar(reserva:Reserva):void{
      localStorage.setItem("id", this.reserva.id.toString());
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