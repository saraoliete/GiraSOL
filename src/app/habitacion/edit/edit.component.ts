import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Habitacion } from 'src/app/Modelo/habitacion';
import { Tipohabitacion } from 'src/app/Modelo/tipohabitacion';
import { ServiceService } from 'src/app/Service/service.service';
import swal from 'sweetalert2';

@Component({
    selector: 'EditHabitacion',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})

export class EditHabitacion implements OnInit{

    habitacion!:Habitacion;
    formEditHabitacion!:FormGroup;

    lista!: Array<Tipohabitacion>;

    constructor(private service:ServiceService, private router:Router, private formBuilder:FormBuilder){
      
      this.formEditHabitacion = this.formBuilder.group({
        id:[],
        tipohabitacion:[]
  
      });
      
    }

    ngOnInit(){

      this.habitacion = new Habitacion();

      let id = localStorage.getItem("id");

      console.log("editar:"+id);

      this.service.getAllTipohabitacion().subscribe(data=> this.lista=data)

      this.service.getHabitacion(id).subscribe(data=> {this.habitacion=data;this.formEditHabitacion.get('tipohabitacion')?.setValue(this.habitacion.tipohabitacion.id);})
      
    }

    activarComponente(){

      swal.fire({
        title: 'Confirme, por favor.',
        text: '¿Quiere guardar los cambios?',
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

      this.habitacion.tipohabitacion.id = this.formEditHabitacion.get('tipohabitacion')?.value;
      this.service.updateHabitacion(this.habitacion).subscribe(data => {
        this.habitacion = data;
         console.log(data);
        this.router.navigate(["getPageHabitacion"]);
      }, error => console.log(error));
        
      swal.fire({
        title: '¡Enhorabuena!',
        text: 'La habitación ' + this.habitacion.id + ' ha sido creada correctamente.',
        icon: 'success'
      });
      
    }

    Cancelar(){

      swal.fire({

        title: '¡Cancelado!',
        text: 'Los cambios en la habitación ' +  this.habitacion.id + ' no han sido guardados.',
        icon: 'error'
      });
      this.router.navigate(["getPageHabitacion"]);
    }

    Volver(){        
      this.router.navigate(["getPageHabitacion"]);
    }
}