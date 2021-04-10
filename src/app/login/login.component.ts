import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Usuario } from "../Modelo/usuario";
import { ServiceService } from "../Service/service.service";

@Component({
  selector: "Login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent{

    usuario!:Usuario;
    formLogin!: FormGroup;

  constructor(private service: ServiceService, private router:Router, private formBuilder:FormBuilder, private activatedRoute: ActivatedRoute) {

    this.formLogin = this.formBuilder.group({
      nombreusuario:[],
      password:[]

    })
  
    
  }

  Check(){

    this.service.checkUsuario().subscribe(
      data=>{ console.log(data)})
  }

  Login(){
    let parameter = JSON.stringify(this.formLogin.value);
    this.service.login(parameter).subscribe(
    data=>{
      this.service.setToken(data.token);
      console.log(data);
      this.router.navigate(["home"]);
    },
    error => {
      console.log(error);
    });
  }

  Logout(){
    this.service.logout();
    alert("Has cerrado sesion correctamente");
    this.router.navigate(["home"]);

  }

  Volver(){        
    this.router.navigate(["home"]);
  }
}