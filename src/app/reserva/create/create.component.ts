//create user va a servir para registrarse
//por lo tanto cuando el usuario pinche sobre el boton registrarse le mandara a traves del routing para 
//crear el usuario

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { empty } from "rxjs";
import { Habitacion } from "src/app/Modelo/habitacion";
import { Pension } from "src/app/Modelo/pension";
import { Reserva } from "src/app/Modelo/reserva";
import { Tipohabitacion } from "src/app/Modelo/tipohabitacion";
import { Usuario } from "src/app/Modelo/usuario";
import { ServiceService } from "src/app/Service/service.service";
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: "CreateReserva",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateReserva implements OnInit{

    formCreateReserva!: FormGroup;

    reserva:Reserva=new Reserva();
    pensiones!: Array<Pension>;
    habitaciones!: Array<Tipohabitacion>;

    PrecioTotal!:number;
    PrecioHabitacion!:number;
    PrecioPension!:number;
    Days!:number;


    constructor(private service: ServiceService, private router:Router, private fomrBuilder:FormBuilder, private datePipe:DatePipe) {

      this.formCreateReserva = this.fomrBuilder.group({
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

      this.service.getAllTipohabitacion().subscribe(data=> this.habitaciones=data);
      this.service.getAllPension().subscribe(data=> this.pensiones=data);

      //this.formCreateReserva.setValue({precio_final: this.Calculadora()});

      this.reserva.precio_final = this.Calculadora();


     }

  CrearReserva() {

    console.log("CrearReserva");
        
        this.reserva.usuario.id = this.formCreateReserva.get('usuario')?.value;
        this.reserva.pension.id = this.formCreateReserva.get('pension')?.value;
        this.reserva.habitacion.id = this.formCreateReserva.get('habitacion')?.value;
        this.reserva.cama_supletoria = this.formCreateReserva.get('cama_supletoria')?.value;
        
        this.reserva.fecha_llegada = new Date(this.formCreateReserva.get('fecha_llegada')?.value);
        this.reserva.fecha_final = new Date(this.formCreateReserva.get('fecha_final')?.value);
        
        this.reserva.precio_final = this.formCreateReserva.get('precio_final')?.value;




     
     this.service.createReserva(this.reserva).subscribe(data => {
      this.reserva = data;
      this.router.navigate(["getPageReserva"]);
      
      swal.fire({
        title: '¡Enhorabuena!',
        text: 'La reserva ha sido creada correctamente.',
        icon: 'success'
      });
      
    }, error => swal.fire({
      title: 'Error al crear en reserva',
      text: error,
      icon: 'error'
    }));
    
  }


  Calculadora():number{

    let PrecioTotalVoid:number = this.PrecioTotal;

  if(this.formCreateReserva.get('fecha_llegada')?.value != undefined && 
  this.formCreateReserva.get('fecha_final')?.value != undefined && 
  this.formCreateReserva.get('pension')?.value != undefined && 
  this.formCreateReserva.get('habitacion')?.value != undefined){

    let dia_llegada = new Date(this.formCreateReserva.get('fecha_final')?.value).getDay();
    let dia_partida = new Date(this.formCreateReserva.get('fecha_llegada')?.value).getDay();

    if(dia_llegada < dia_partida){

      this.Days = dia_partida - dia_llegada;
      
    }else if(dia_partida < dia_llegada){

      this.Days = dia_llegada - dia_partida;

    }
   
   
   
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