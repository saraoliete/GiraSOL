import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Usuario } from "../Modelo/usuario";
import { ServiceService } from "../Service/service.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent{

    formLogin!: FormGroup;

  constructor(private service: ServiceService, private router:Router, private formBuilder:FormBuilder) {

    this.formLogin = this.formBuilder.group({
      nombreusuario:[],
      password:[]

    })

    this.Login();

  }

  Login(){
    let parameter = JSON.stringify(this.formLogin.value);
    this.service.login(parameter).subscribe(
    data=>{
       this.service.setToken(data.token);      
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
}