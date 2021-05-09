import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Modelo/usuario';
import { ServiceService } from 'src/app/Service/service.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-EditUsuario',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})

export class EditUsuario implements OnInit{

    usuario:Usuario=new Usuario();
    formEditUser!:FormGroup;
    constructor(private service:ServiceService, private router:Router, private formBuilder:FormBuilder){

      this.formEditUser = this.formBuilder.group({
        nombre:[],
        apellidos:[],
        dni:[],
        sexo:[],
        email:[],
        localidad:[],
        nacionalidad:[],
        telefono:[],
        edad:[],
        nombreusuario:[],
        password:[]
  
      })
    }

    ngOnInit(){       

      this.usuario = new Usuario();

      let id = localStorage.getItem("id");

      console.log("editar:"+id);

      this.service.getUsuario(id).subscribe(data=>{ this.usuario=data;});

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

        this.service.updateUsuario(this.usuario).subscribe(data=>{this.usuario=data;
        this.router.navigate(["getPageUsuario"]);})

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
      this.router.navigate(["getPageUsuario"]);
    }

    Volver(){        
        this.router.navigate(["getPageUsuario"]);
      }
}