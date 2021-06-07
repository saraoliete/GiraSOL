import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Login } from "../Modelo/login";
import { Usuario } from "../Modelo/usuario";
import { ServiceService } from "../Service/service.service";
import { StorageService } from "../Service/storage.service";
import swal from 'sweetalert2';

@Component({
  selector: "Login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent{

    usuario:Usuario = new Usuario();
    login:Login = new Login();
    formLogin!: FormGroup;

  constructor(private service: ServiceService, private storage: StorageService, private router:Router, private formBuilder:FormBuilder, private activatedRoute: ActivatedRoute) {

    this.formLogin = this.formBuilder.group({
      nombreusuario:[],
      password:[]

    })
  
    
  }

  Check(){

    this.service.checkUsuario().subscribe(
      data=>{ console.log("check:" + data);})
  }

  Login(){
    let parameter = JSON.stringify(this.formLogin.value);
    this.service.login(parameter).subscribe(
    data=>{
      console.log("login:" + data.token + ", nombreusuario:" + data.nombreusuario + ", password:" + data.password);

      if(data.token!=null){
        this.storage.setCurrentSession(data);
      }

      swal.fire({
        title: '¡Correcto!',
        text: 'Has iniciado sesión como ' + data.nombreusuario,
        icon: 'success'
      });

      this.router.navigate(["app-root"]);
    },
    error => {

      swal.fire({
        title: '¡Ups! ¡El nombre de usuario o contraseña no coincide!',
        text: '¿No tienes cuenta? Regístrate.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Volver a intentar',
        cancelButtonText: 'No, quiero registrarme'
      }).then((result) => {
        if(result.value){

          this.formLogin?.reset();
          this.router.navigate(["Login"]);

          } else if (result.dismiss === swal.DismissReason.cancel){

            this.router.navigate(["RegisterUsuario"]);

          }
      })
    });
  }
  

  Volver(){        
    this.router.navigate(["app-root"]);
  }
}