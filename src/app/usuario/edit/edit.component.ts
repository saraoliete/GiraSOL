import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Modelo/usuario';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
    selector: 'app-EditUsuario',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})

export class EditUsuario implements OnInit{

    usuario:Usuario=new Usuario();
    formEditUsuario!:FormGroup;
    constructor(private service:ServiceService, private router:Router, private formBuilder:FormBuilder){}

    ngOnInit(){

        this.formEditUsuario = this.formBuilder.group({
            nombre:[],
            apellidos:[],
            dni:[],
            sexo:[],
            email:[],
            localidad:[],
            telefono:[],
            edad:[],
            nombreusuario:[],
            password:[]
      
          })

        this.EditUsuario();
    }

    EditUsuario(){
        let id: Number = this.usuario.idusuario!;
        localStorage.getItem("id");
        this.service.getUsuario(+id).subscribe(data=>{ this.usuario=data;})
      }

    Guardar(){
        let parameter = JSON.stringify(this.formEditUsuario.value);
        this.service.updateUsuario(parameter).subscribe(data=>{this.usuario=data;
        alert("Se ha guardado con exito");
        this.router.navigate(["getPageUsuario"]);})

    }
}