import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tipousuario } from 'src/app/Modelo/tipousuario';
import { Usuario } from 'src/app/Modelo/usuario';
import { ServiceService } from 'src/app/Service/service.service';
import { StorageService } from 'src/app/Service/storage.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-EditUsuario',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})

export class EditUsuario implements OnInit{

    usuario:Usuario=new Usuario();
    tipousuario!:Array<Tipousuario>;
    formEditUser!:FormGroup;
    constructor(private service:ServiceService, private storage:StorageService, private router:Router, private formBuilder:FormBuilder){

      this.formEditUser = this.formBuilder.group({
        id:[''],
        nombre:['', [Validators.required, Validators.pattern, Validators.maxLength, Validators.minLength]],
        apellidos:['', [Validators.required, Validators.pattern, Validators.maxLength, Validators.minLength]],
        dni:['', [Validators.required, Validators.pattern]],
        sexo:[''],
        email:['', [Validators.required, Validators.pattern, Validators.maxLength, Validators.minLength]],
        localidad:['', [Validators.required, Validators.pattern]],
        nacionalidad:['', [Validators.required, Validators.pattern]],
        telefono:['', [Validators.required, Validators.pattern]],
        edad:['', [Validators.required, Validators.maxLength]],
        nombreusuario:['', [Validators.required, Validators.pattern, Validators.maxLength, Validators.minLength]],
        password:['', [Validators.required, Validators.pattern, Validators.maxLength, Validators.minLength]],
        tipousuario:['']
  
      })
    }

    ngOnInit(){       

      this.usuario = new Usuario();

      let id = localStorage.getItem("id");

      console.log("editar:"+id);

      this.service.getAllTipousuario().subscribe(data=> this.tipousuario=data);

      this.service.getUsuario(id).subscribe(data=>{ 
      this.usuario=data;
      this.formEditUser.get('nombre')?.setValue(this.usuario.nombre);
      this.formEditUser.get('apellidos')?.setValue(this.usuario.apellidos);
      this.formEditUser.get('dni')?.setValue(this.usuario.dni);
      this.formEditUser.get('sexo')?.setValue(this.usuario.sexo);
      this.formEditUser.get('edad')?.setValue(this.usuario.edad);
      this.formEditUser.get('email')?.setValue(this.usuario.edad);
      this.formEditUser.get('telefono')?.setValue(this.usuario.telefono);
      this.formEditUser.get('localidad')?.setValue(this.usuario.localidad);
      this.formEditUser.get('nacionalidad')?.setValue(this.usuario.nacionalidad);
      this.formEditUser.get('nombreusuario')?.setValue(this.usuario.nombreusuario);
      this.formEditUser.get('password')?.setValue(this.usuario.password);
      this.formEditUser.get('tipousuario')?.setValue(this.usuario.tipousuario.id);
      this.formEditUser.get('id')?.setValue(this.usuario.id);
      });

    }

    esAdministrador():boolean {
      return this.storage.getCurrentSession()?.tipousuario.id == 1;
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

        this.usuario.nombre = this.formEditUser.get('nombre')?.value;
        this.usuario.apellidos = this.formEditUser.get('apellidos')?.value;
        this.usuario.dni = this.formEditUser.get('dni')?.value;
        this.usuario.sexo = this.formEditUser.get('sexo')?.value;
        this.usuario.edad = this.formEditUser.get('edad')?.value;
        this.usuario.email = this.formEditUser.get('email')?.value;
        this.usuario.telefono = this.formEditUser.get('telefono')?.value;
        this.usuario.localidad = this.formEditUser.get('localidad')?.value;
        this.usuario.nacionalidad = this.formEditUser.get('nacionalidad')?.value;
        this.usuario.nombreusuario = this.formEditUser.get('nombreusuario')?.value;
        this.usuario.password = this.formEditUser.get('password')?.value;
        this.usuario.tipousuario.id = this.formEditUser.get('tipousuario')?.value;

        this.service.updateUsuario(this.usuario).subscribe(data=>{this.usuario=data;
        this.router.navigate(["app-PersonalView"]);})

        swal.fire({
          title: '¡Enhorabuena!',
          text: 'El usuario ' + this.usuario.nombreusuario + ' ha sido editado correctamente.',
          icon: 'success'
        });



    }

    Cancelar(){

      swal.fire({
  
        title: '¡Cancelado!',
        text: 'Los cambios en el usuario ' +  this.usuario.nombreusuario + ' no han sido guardados.',
        icon: 'error'
      });
      this.router.navigate(["app-PersonalView"]);
    }

    Volver(){        
        this.router.navigate(["app-PersonalView"]);
      }
}