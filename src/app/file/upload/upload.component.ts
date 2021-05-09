import { Component, OnInit , ViewChild,ElementRef} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import {FileImg} from 'src/app/Modelo/file';
import swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'UploadFile',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})

export class UploadFile implements OnInit{

    currentFile!:File;
    formUploadFile!:FormGroup;
    progress = 0;
    fileInfos!:Observable<any>;

    @ViewChild('fileImg') fileImg : any;
    myInputVariable!: ElementRef;

    constructor(private service:ServiceService, private router:Router, private formBuilder:FormBuilder){
      
        this.formUploadFile = this.formBuilder.group({

            imgFile:[]
          });
      
    }

    ngOnInit(){

    }

    fileEvent(archivo: Event){

        let file = (<HTMLInputElement>archivo.target).files;

        if (file != null) {
            if(file[0].type == "image/jpg" || file[0].type == "image/jpeg"){
                this.currentFile = file[0];
                console.log(file);
            } else {

               swal.fire({
                    title: 'Error',
                    text: 'Esta aplicación solo soporta archivos jpg y jpeg, gracias.',
                    icon: 'error'
                  });

                  this.myInputVariable.nativeElement.value = "";

            }
         }
    }

    UploadFile(){
       
        this.service.uploadImagenes(this.currentFile).subscribe(event => {

            swal.fire({
                title: '¡Enhorabuena!',
                text: 'El archivo ha sido procesado correctamente.',
                icon: 'success'
              });
           
        }, error => {

            swal.fire({
                title: 'Error',
                text: error,
                icon: 'error'
              });
        });
    }

    Volver(){

    }

    
}