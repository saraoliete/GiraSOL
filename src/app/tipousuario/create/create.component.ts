import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Tipousuario } from 'src/app/Modelo/tipousuario';
import { ServiceService } from 'src/app/Service/service.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-CreateTipousuario',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})

export class CreateTipousuario implements OnInit{

    Tipousuario!:Tipousuario;
    formCreateTipousuario!:FormGroup;

    lista!: Array<Tipousuario>;

    constructor(private service:ServiceService, private router:Router, private formBuilder:FormBuilder){
        this.formCreateTipousuario = this.formBuilder.group({
            nombre:[]
      
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

      this.Tipousuario.nombre = this.formCreateTipousuario.get('nombre')?.value;

      this.service.createTipousuario(this.Tipousuario).subscribe(data => {
        this.Tipousuario = data;
         console.log(data);
        this.router.navigate(["app-getPageTipousuario"]);

      }, error => console.log(error));
        
      swal.fire({
        title: '¡Enhorabuena!',
        text: 'El tipo de usuario ' + this.Tipousuario.id + ' ha sido creado correctamente.',
        icon: 'success'
      });
      
    }

    Cancelar(){

      swal.fire({

        title: '¡Cancelado!',
        text: 'El nuevo registro no han sido guardados.',
        icon: 'error'
      });
    }

    Volver(){        
        this.router.navigate(["app-getPageTipousuario"]);
    }
}