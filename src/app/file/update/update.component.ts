import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import {FileImg} from 'src/app/Modelo/file';
import swal from 'sweetalert2';

@Component({
    selector: 'UpdateFile',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss']
})

export class UpdateFile implements OnInit{

    file!:File;
    formUpdateFile!:FormGroup;

    constructor(private service:ServiceService, private router:Router, private formBuilder:FormBuilder){
      
        this.formUpdateFile = this.formBuilder.group({
            
            file:[]
      
          });
      
      
    }

    ngOnInit(){}

    UpdateFile(archivo:File){

        this.service.uploadImagenes(archivo).subscribe(data=>{

            console.log(data);
        }, error=>console.log(error))
    }

    fileEvent(archivo: Event){

        let file = (<HTMLInputElement>archivo.target).files;

        if (file != null) {
            if(file[0].type == "image/jpg" || file[0].type == "image/jpg"){

                console.log(file);
            }
         }

    }

    Volver(){

    }

    
}