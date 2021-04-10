import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder }  from '@angular/forms';
import { Router } from '@angular/router';
import { Pension } from 'src/app/Modelo/pension';
import { ServiceService } from 'src/app/Service/service.service';
import swal from 'sweetalert2';

@Component({
    selector: 'CreatePension',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})

export class CreatePension implements OnInit{

    pension:Pension=new Pension();
    formCreatePension!:FormGroup;
    opcion:number = 0;

    constructor(private service:ServiceService, private router:Router, private formBuilder:FormBuilder){
        this.formCreatePension = this.formBuilder.group({
            tipo:[],
            descripcion:[],
            precio:[]      
          })
    }

    ngOnInit(){}

    
    CreatePension(){
        
        console.log("createPension");
        
        this.pension.tipo = this.formCreatePension.get('tipo')?.value;
        this.pension.descripcion = this.formCreatePension.get('descripcion')?.value;
        this.pension.precio = this.formCreatePension.get('precio')?.value;
     
     this.service.createPension(this.pension).subscribe(data => {
      this.pension = data;
      this.router.navigate(["getPagePension"]);
      
      swal.fire({
        title: '¡Enhorabuena!',
        text: 'La habitación ha sido creada correctamente.',
        icon: 'success'
      });
      
    }, error => swal.fire({
      title: 'Error al crear en Pensión',
      text: error,
      icon: 'error'
    }));


    }


    Cancelar(){

        this.opcion = 0;

    }

    Volver(){        
        this.router.navigate(["getPagePension"]);
    }
}