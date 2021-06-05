import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Tipousuario } from 'src/app/Modelo/tipousuario';
import { ServiceService } from 'src/app/Service/service.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-EditTipousuario',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})

export class EditTipousuario implements OnInit{

    Tipousuario!:Tipousuario;
    formEditTipousuario!:FormGroup;

    lista!: Array<Tipousuario>;

    constructor(private service:ServiceService, private router:Router, private formBuilder:FormBuilder){
        this.formEditTipousuario = this.formBuilder.group({
            id:[],
            nombre:[]
      
          })
    }

    ngOnInit(){ 

      this.Tipousuario = new Tipousuario();

      let id = localStorage.getItem("id");

      console.log("editar:"+id);

      this.service.getTipousuario(id).subscribe(data=> {
          this.Tipousuario=data;
          this.formEditTipousuario.get('id')?.setValue(this.Tipousuario.id);
          this.formEditTipousuario.get('nombre')?.setValue(this.Tipousuario.nombre);})

    }

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

      this.Tipousuario.id = this.formEditTipousuario.get('id')?.value;
      this.Tipousuario.nombre = this.formEditTipousuario.get('nombre')?.value;

      this.service.updateTipousuario(this.Tipousuario).subscribe(data => {
        this.Tipousuario = data;
         console.log(data);
        this.router.navigate(["app-getPageTipousuario"]);

      }, error => console.log(error));
        
      swal.fire({
        title: '¡Enhorabuena!',
        text: 'El tipo de usuario ' + this.Tipousuario.id + ' ha sido editado correctamente.',
        icon: 'success'
      });
      
    }

    Cancelar(){

      swal.fire({

        title: '¡Cancelado!',
        text: 'Los cambios en el tipo de usuario ' + this.Tipousuario.id + ' no se han guardado.',
        icon: 'error'
      });
    }

    Volver(){        
        this.router.navigate(["app-getPageTipousuario"]);
    }
}