import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Tipohabitacion } from 'src/app/Modelo/tipohabitacion';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
    selector: 'app-EditTipohabitacion',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})

export class EditTipohabitacion implements OnInit{

    tipohabitacion:Tipohabitacion=new Tipohabitacion();
    formEditTipohabitacion!:FormGroup;
    constructor(private service:ServiceService, private router:Router, private formBuilder:FormBuilder){}

    ngOnInit(){

        this.formEditTipohabitacion = this.formBuilder.group({
            nombre:[],
            numero_camas:[],
            descripcion:[],
            precio:[]
      
          })

        this.EditTipohabitacion();
    }

    EditTipohabitacion(){
        let id: Number = this.tipohabitacion.id_tipohabitacion!;
        localStorage.getItem("id");
        this.service.getTipohabitacion(+id).subscribe(data=>{ this.tipohabitacion=data;})
      }

    Guardar(){
        let parameter = JSON.stringify(this.formEditTipohabitacion.value);
        this.service.updateTipohabitacion(parameter).subscribe(data=>{this.tipohabitacion=data;
        alert("Se ha guardado con exito");
        this.router.navigate(["getPageTipohabitacion"]);})

    }
}