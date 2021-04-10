import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder }  from '@angular/forms';
import { Router } from '@angular/router';
import { Pension } from 'src/app/Modelo/pension';
import { ServiceService } from 'src/app/Service/service.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-EditPension',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})

export class EditPension implements OnInit{

    pension:Pension=new Pension();
    formEditPension!:FormGroup;

    constructor(private service:ServiceService, private router:Router, private formBuilder:FormBuilder){
        this.formEditPension = this.formBuilder.group({
            tipo:[],
            descripcion:[],
            precio:[]      
          })
    }

    ngOnInit(){        

        this.pension = new Pension();
        let id = localStorage.getItem("id");
        this.service.getPension(id).subscribe(data=>{ this.pension=data;})
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

        this.service.updatePension(this.pension).subscribe(data => {
          this.pension = data;
           console.log(data);
          this.router.navigate(["getPagePension"]);
        }, error => console.log(error));
          
        swal.fire({
          title: '¡Enhorabuena!',
          text: 'La pensión ' + this.pension.id + ' ha sido creada correctamente.',
          icon: 'success'
        });
        
      }
  
      Cancelar(){
  
        swal.fire({
  
          title: '¡Cancelado!',
          text: 'Los cambios en la pensión ' +  this.pension.id + ' no han sido guardados.',
          icon: 'error'
        });
        this.router.navigate(["getPagePension"]);
      }

    Volver(){        
        this.router.navigate(["getPagePension"]);
    }
}