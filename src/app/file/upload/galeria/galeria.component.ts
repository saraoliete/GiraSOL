import { Component, OnInit , ViewChild,ElementRef} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import {FileImg} from 'src/app/Modelo/file';
import swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'GaleriaImagenes',
    templateUrl: './galeria.component.html',
    styleUrls: ['./galeria.component.scss']
})

export class GaleriaImagenes implements OnInit{

    constructor(private service:ServiceService, private router:Router, private formBuilder:FormBuilder){
      
        
      
    }

    ngOnInit(){

        

    }

    
    Volver(){

    }

    
}