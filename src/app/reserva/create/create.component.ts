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
import { Validators } from "@angular/forms";
import { StorageService } from "src/app/Service/storage.service";

@Component({
  selector: "CreateReserva",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateReserva implements OnInit{

    formCreateReserva!: FormGroup;

    reserva:Reserva=new Reserva();
    usuario!:Usuario;
    pensiones!: Array<Pension>;
    habitaciones!: Array<Tipohabitacion>;

    PrecioTotal!:number;
    PrecioHabitacion!:number;
    PrecioPension!:number;
    Days!:number;


    constructor(private service: ServiceService, private storage:StorageService, private router:Router, private fomrBuilder:FormBuilder, private datePipe:DatePipe) {

      this.formCreateReserva = this.fomrBuilder.group({
        usuario:[],
        pension:['', [Validators.required]],
        habitacion:['', [Validators.required]],
        cama_supletoria:[],
        fecha_llegada:['', [Validators.required]],
        fecha_final:['', [Validators.required]],
        precio_final:[]

      })

    }

    ngOnInit(){ 

      this.service.getAllTipohabitacion().subscribe(data=> {this.habitaciones=data});
      this.service.getAllPension().subscribe(data=> {this.pensiones=data});


     }

     recuperarIdUsuario(){
      return this.storage.getCurrentSession()?.id;
    }

      getCurrentUser(){

        let id = String(this.recuperarIdUsuario());
        this.service.getUsuario(id).subscribe(data =>{this.usuario=data});
      }


      activarComponente(){

        swal.fire({
          title: 'Precio total: ' + this.Calculadora() + '€',
          text: '¿Estás de acuerdo? ¿Quieres guardar los cambios?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Sí, guardar cambios',
          cancelButtonText: 'No, no quiero guardar'
        }).then((result) => {
          if(result.value){
            
            this.CrearReserva();
            
          }else if(result.dismiss === swal.DismissReason.cancel){
            
              this.Cancelar();
          }
        })
        
      }

  CrearReserva() {

    console.log("CrearReserva");
        
        this.reserva.usuario.id = Number(this.recuperarIdUsuario());
        this.reserva.pension.id = this.formCreateReserva.get('pension')?.value;
        this.reserva.habitacion.id = this.formCreateReserva.get('habitacion')?.value;
        this.reserva.cama_supletoria = this.formCreateReserva.get('cama_supletoria')?.value;
        
        this.reserva.fecha_llegada = new Date(this.formCreateReserva.get('fecha_llegada')?.value);
        this.reserva.fecha_final = new Date(this.formCreateReserva.get('fecha_final')?.value);
        
        this.reserva.precio_final = this.Calculadora();

     
     this.service.createReserva(this.reserva).subscribe(data => {
      this.reserva = data;
      this.router.navigate(["getPageReserva"]);
      
      swal.fire({
        title: '¡Enhorabuena!',
        text: 'La reserva ha sido creada correctamente.',
        icon: 'success'
      });
      
    }, error => swal.fire({
      title: '¡Error!',
      text: 'Todos los campos son obligatorios excepto la cama supletoria.',
      icon: 'error'
    }));
    
  }


  Cancelar(){

    swal.fire({

      title: '¡Cancelado!',
      text: 'Los cambios no han sido guardados.',
      icon: 'error'
    });
    this.formCreateReserva?.reset();
    this.router.navigate(["CreateReserva"]);
  }


  Calculadora():number{

    let PrecioTotalVoid:number = this.PrecioTotal;
    let diaEnMils = 1000* 60 * 60 *24;

  if(this.formCreateReserva.get('fecha_llegada')?.value != undefined && 
  this.formCreateReserva.get('fecha_final')?.value != undefined && 
  this.formCreateReserva.get('pension')?.value != undefined && 
  this.formCreateReserva.get('habitacion')?.value != undefined){

    let dia_llegada = new Date(this.formCreateReserva.get('fecha_final')?.value).getTime();
    let dia_partida = new Date(this.formCreateReserva.get('fecha_llegada')?.value).getTime();

    console.log('dia llegada: ' + dia_llegada + ', dia partida: ' + dia_partida);

    if(dia_llegada < dia_partida){

      this.Days = Math.floor((dia_partida - dia_llegada) / diaEnMils );
      
    }else if(dia_partida < dia_llegada){

      this.Days = Math.floor((dia_llegada - dia_partida) / diaEnMils );

    }
   
   
   
      for( let item of this.pensiones){

        this.PrecioPension = item.precio;

      }

     for(let item of this.habitaciones){
  
        this.PrecioHabitacion = item.precio;
  
      }

     if(this.formCreateReserva.get('cama_supletoria')?.value != false){


      PrecioTotalVoid = (this.PrecioHabitacion + this.PrecioPension)*this.Days + 5;

     }else{

      PrecioTotalVoid = (this.PrecioHabitacion + this.PrecioPension)*this.Days;

     }

     
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