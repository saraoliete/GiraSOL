import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Login } from "../Modelo/login";
import { Usuario } from "../Modelo/usuario";
import { ServiceService } from "../Service/service.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent{

    usuario:Usuario = new Usuario();

  constructor(private service:ServiceService, private router:Router){}

  Login(){
    const user = {nombreusuario: this.usuario.nombreusuario, password: this.usuario.password, token:this.usuario.token};
    this.service.login(user).subscribe(
    data=>{this.service.setToken(data.token);
      this.router.navigate(["/"]);
    },
    error => {
      console.log(error);
    });
  }
}