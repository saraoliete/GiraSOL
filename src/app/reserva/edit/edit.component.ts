//create user va a servir para registrarse
//por lo tanto cuando el usuario pinche sobre el boton registrarse le mandara a traves del routing para 
//crear el usuario

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Habitacion } from "src/app/Modelo/habitacion";
import { Pension } from "src/app/Modelo/pension";
import { Reserva } from "src/app/Modelo/reserva";
import { Tipohabitacion } from "src/app/Modelo/tipohabitacion";
import { Usuario } from "src/app/Modelo/usuario";
import { ServiceService } from "src/app/Service/service.service";
import swal from 'sweetalert2';

@Component({
  selector: "EditReserva",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"]
})
export class EditReserva implements OnInit{

  formEditReserva!: FormGroup;

    reserva!:Reserva;
    pensiones!: Array<Pension>;
    habitaciones!: Array<Tipohabitacion>;

    PrecioTotal!:number;
    PrecioHabitacion!:number;
    PrecioPension!:number;
    Days!:number;

    constructor(private service: ServiceService, private router:Router, private fomrBuilder:FormBuilder) {

      this.formEditReserva = this.fomrBuilder.group({
        id:[],
        usuario:[],
        pension:[],
        habitacion:[],
        cama_supletoria:[],
        fecha_llegada:[],
        fecha_final:[],
        precio_final:[]

      })

    }

    ngOnInit(){ 

      this.reserva = new Reserva();

      let id = localStorage.getItem("id");

      console.log("editar:"+id);

      this.service.getAllTipohabitacion().subscribe(data=> this.habitaciones=data);
      this.service.getAllPension().subscribe(data=> this.pensiones=data);

      this.service.getReserva(id).subscribe(data=> {this.reserva=data;this.formEditReserva.get('habitacion')?.setValue(this.reserva.habitacion.id); this.formEditReserva.get('pension')?.setValue(this.reserva.pension.id);this.formEditReserva.get('usuario')?.setValue(this.reserva.usuario.id);})

     }

     activarComponente(){

      swal.fire({
        title: 'Confirme, por favor.',
        text: '¿Quieres guardar los cambios?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, guardar cambios',
        cancelButtonText: 'No, no quiero guardar'
      }).then((result) => {
        if(result.value){
          
          this.Guardar();
          
        }else if(result.dismiss === swal.DismissReason.cancel){
          
            this.Cancelar();
        }
      })
      
    }

  Guardar(){

    console.log("EditarReserva");
        
        this.reserva.id = this.formEditReserva.get('id')?.value;
        this.reserva.usuario.id = this.formEditReserva.get('usuario')?.value;
        this.reserva.pension.id = this.formEditReserva.get('pension')?.value;
        this.reserva.habitacion.id = this.formEditReserva.get('habitacion')?.value;
        this.reserva.cama_supletoria = this.formEditReserva.get('cama_supletoria')?.value;
        this.reserva.fecha_llegada = new Date(this.formEditReserva.get('fecha_llegada')?.value);
        this.reserva.fecha_final = new Date(this.formEditReserva.get('fecha_final')?.value);
        this.reserva.precio_final = this.Calculadora();


     
     this.service.updateReserva(this.reserva).subscribe(data => {
      //this.reserva = data;
      console.log(data);
     this.router.navigate(["getPageReserva"]);
   }, error => console.log(error));
     
   swal.fire({
     title: '¡Enhorabuena!',
     text: 'La reserva ' + this.reserva.id + ' ha sido editada correctamente.',
     icon: 'success'
   });
   
 }

  Cancelar(){

    swal.fire({

      title: '¡Cancelado!',
      text: 'Los cambios en la habitación ' +  this.reserva.id + ' no han sido guardados.',
      icon: 'error'
    });
    this.router.navigate(["getPageReserva"]);
  }

  Calculadora():number{

    let PrecioTotalVoid:number = this.PrecioTotal;

  if(this.formEditReserva.get('fecha_llegada')?.value != undefined && 
  this.formEditReserva.get('fecha_final')?.value != undefined && 
  this.formEditReserva.get('pension')?.value != undefined && 
  this.formEditReserva.get('habitacion')?.value != undefined){
   
   this.Days = new Date(this.formEditReserva.get('fecha_final')?.value).getDay() - new Date(this.formEditReserva.get('fecha_llegada')?.value).getDay();
   
    for( let item of this.pensiones){
      
      this.PrecioPension = item.precio;
      
     }

     for(let item of this.habitaciones){
   
      this.PrecioHabitacion = item.precio;
   
     }

     PrecioTotalVoid = (this.PrecioHabitacion + this.PrecioPension)*this.Days;
     
    }
    
    console.log("Días: " + this.Days);
    console.log("Precio pension: " + this.PrecioPension);
    console.log("Precio habitacion: " + this.PrecioHabitacion);
    console.log("Precio total: " + PrecioTotalVoid);
    return PrecioTotalVoid;
  
  }

  Volver(){        
    this.router.navigate(["getPageReserva"]);
  }
}