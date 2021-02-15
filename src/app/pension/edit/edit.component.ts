import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Pension } from 'src/app/Modelo/pension';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
    selector: 'app-EditPension',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})

export class EditPension implements OnInit{

    pension:Pension=new Pension();
    formEditPension!:FormGroup;
    constructor(private service:ServiceService, private router:Router, private formBuilder:FormBuilder){}

    ngOnInit(){

        this.formEditPension = this.formBuilder.group({
            tipo:[],
            descripcion:[],
            precio:[]
      
          })

        this.EditPension();
    }

    EditPension(){
        let id: Number = this.pension.idpension!;
        localStorage.getItem("id");
        this.service.getPension(+id).subscribe(data=>{ this.pension=data;})
      }

    Guardar(){
        let parameter = JSON.stringify(this.formEditPension.value);
        this.service.updatePension(parameter).subscribe(data=>{this.pension=data;
        alert("Se ha guardado con exito");
        this.router.navigate(["getPagePension"]);})

    }
}