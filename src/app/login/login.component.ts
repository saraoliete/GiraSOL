import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Login } from "../Modelo/login";
import { Usuario } from "../Modelo/usuario";
import { ServiceService } from "../Service/service.service";

@Component({
  selector: "Login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent{

    usuario:Usuario = new Usuario();
    login:Login = new Login();
    formLogin!: FormGroup;

  constructor(private service: ServiceService, private router:Router, private formBuilder:FormBuilder, private activatedRoute: ActivatedRoute) {

    this.formLogin = this.formBuilder.group({
      nombreusuario:[],
      password:[]

    })
  
    
  }

  Check(){

    this.service.checkUsuario().subscribe(
      data=>{ console.log("check:" + data)})
  }

  Login(){
    let parameter = JSON.stringify(this.formLogin.value);
    this.service.login(parameter).subscribe(
    data=>{
      this.service.setToken(data.token);
      console.log("login:" + data.token + ", nombreusuario:" + data.nombreusuario + ", password:" + data.password);

      localStorage.setItem("token", data.token.toString());

      if(data.token!=null){

        localStorage.setItem('id', data.id.toString());
      }

      this.router.navigate(["home"]);
    },
    error => {
      console.log(error);
    });
  }
  

  Volver(){        
    this.router.navigate(["home"]);
  }
}