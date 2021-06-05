import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Tipohabitacion } from 'src/app/Modelo/tipohabitacion';
import { ServiceService } from 'src/app/Service/service.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-EditTipohabitacion',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})

export class EditTipohabitacion implements OnInit{

    tipohabitacion!:Tipohabitacion;
    formEditTipohabitacion!:FormGroup;

    lista!: Array<Tipohabitacion>;

    constructor(private service:ServiceService, private router:Router, private formBuilder:FormBuilder){
        this.formEditTipohabitacion = this.formBuilder.group({
            id:[],
            nombre:['', [Validators.required], [Validators.pattern], [Validators.minLength], [Validators.maxLength]],
            numero_camas:['', [Validators.required], [Validators.pattern]],
            descripcion:['', [Validators.required], [Validators.maxLength]],
            precio:['', [Validators.required], [Validators.pattern]]
      
          })
    }

    ngOnInit(){

      this.tipohabitacion = new Tipohabitacion();

      let id = localStorage.getItem("id");

      console.log("editar:"+id);

      this.service.getTipohabitacion(id).subscribe(data=> {
          this.tipohabitacion=data;
        this.formEditTipohabitacion.get('id')?.setValue(this.tipohabitacion.id);
        this.formEditTipohabitacion.get('nombre')?.setValue(this.tipohabitacion.nombre);
        this.formEditTipohabitacion.get('numero_camas')?.setValue(this.tipohabitacion.numero_camas);
        this.formEditTipohabitacion.get('descripcion')?.setValue(this.tipohabitacion.descripcion);
        this.formEditTipohabitacion.get('precio')?.setValue(this.tipohabitacion.precio);})
      
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

      this.tipohabitacion.id = this.formEditTipohabitacion.get('id')?.value;
      this.tipohabitacion.nombre = this.formEditTipohabitacion.get('nombre')?.value;
      this.tipohabitacion.numero_camas = this.formEditTipohabitacion.get('numero_camas')?.value;
      this.tipohabitacion.descripcion = this.formEditTipohabitacion.get('descripcion')?.value;
      this.tipohabitacion.precio = this.formEditTipohabitacion.get('precio')?.value;

      this.service.updateTipohabitacion(this.tipohabitacion).subscribe(data => {
        this.tipohabitacion = data;
         console.log(data);
        this.router.navigate(["app-getPageTipohabitacion"]);
      }, error => console.log(error));
        
      swal.fire({
        title: '¡Enhorabuena!',
        text: 'La habitación ' + this.tipohabitacion.id + ' ha sido creada correctamente.',
        icon: 'success'
      });
      
    }

    Cancelar(){

      swal.fire({

        title: '¡Cancelado!',
        text: 'Los cambios en la habitación ' +  this.tipohabitacion.id + ' no han sido guardados.',
        icon: 'error'
      });
    }

    Volver(){        
        this.router.navigate(["app-getPageTipohabitacion"]);
    }
}