import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    constructor(private service:ServiceService, private router:Router, private formBuilder:FormBuilder){

      this.formEditUsuario = this.formBuilder.group({
        nombre:["", Validators.compose([Validators.minLength(2), Validators.maxLength(15), Validators.pattern("^[A-Z]{1}[a-z]*?(\s[A-Z]{1}[a-z]*?)*$")])],
        apellidos:["", Validators.compose([Validators.minLength(2), Validators.maxLength(15), Validators.pattern("^[A-Z]{1}[a-z]*?(\s[A-Z]{1}[a-z]*?)*$")])],
        dni:["", Validators.compose([Validators.pattern("^[0-9]{8}[A-Z]{1}$")])],
        sexo:["", Validators.required],
        email:["", Validators.compose([Validators.pattern("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")])],
        localidad:["", Validators.required],
        telefono:["", Validators.required],
        edad:["", Validators.required],
        nombreusuario:["", Validators.required],
        password:["", Validators.required]
  
      })
    }

    ngOnInit(){       

        this.EditUsuario();
    }

    EditUsuario(){
        let id: Number = this.usuario.id!;
        localStorage.getItem("id");
        this.service.getUsuario(+id).subscribe(data=>{ this.usuario=data;})
      }

    Guardar(){
        let parameter = JSON.stringify(this.formEditUsuario.value);
        this.service.updateUsuario(parameter).subscribe(data=>{this.usuario=data;
        alert("Se ha guardado con exito");
        this.router.navigate(["getPageUsuario"]);})

    }

    Volver(){        
        this.router.navigate(["getPageUsuario"]);
      }
}