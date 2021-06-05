import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tipohabitacion } from 'src/app/Modelo/tipohabitacion';
import { ServiceService } from 'src/app/Service/service.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-CreateTipohabitacion',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})

export class CreateTipohabitacion implements OnInit{

    tipohabitacion!:Tipohabitacion;
    formCreateTipohabitacion!:FormGroup;

    lista!: Array<Tipohabitacion>;

    constructor(private service:ServiceService, private router:Router, private formBuilder:FormBuilder){
        this.formCreateTipohabitacion = this.formBuilder.group({
            nombre:['', [Validators.required], [Validators.pattern], [Validators.minLength], [Validators.maxLength]],
            numero_camas:['', [Validators.required], [Validators.pattern]],
            descripcion:['', [Validators.required], [Validators.maxLength]],
            precio:['', [Validators.required], [Validators.pattern]]
      
          })
    }

    ngOnInit(){ }

    activarComponente(){

      swal.fire({
        title: 'Confirme, por favor.',
        text: '¿Quiere guardar el nuevo registro?',
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

      this.tipohabitacion.nombre = this.formCreateTipohabitacion.get('nombre')?.value;
      this.tipohabitacion.numero_camas = this.formCreateTipohabitacion.get('numero_camas')?.value;
      this.tipohabitacion.descripcion = this.formCreateTipohabitacion.get('descripcion')?.value;
      this.tipohabitacion.precio = this.formCreateTipohabitacion.get('precio')?.value;

      this.service.createTipohabitacion(this.tipohabitacion).subscribe(data => {
        this.tipohabitacion = data;
         console.log(data);
        this.router.navigate(["app-getPageTipohabitacion"]);
        
        swal.fire({
          title: '¡Enhorabuena!',
          text: 'El tipo de habitación ' + this.tipohabitacion.id + ' ha sido creado correctamente.',
          icon: 'success'
        });
        
      }, error => console.log(error));
        
      
    }

    Cancelar(){

      swal.fire({

        title: '¡Cancelado!',
        text: 'El nuevo registro no han sido guardados.',
        icon: 'error'
      });
    }

    Volver(){        
        this.router.navigate(["app-getPageTipohabitacion"]);
    }
}