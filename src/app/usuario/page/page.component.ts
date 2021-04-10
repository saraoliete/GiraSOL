import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServiceService } from "src/app/Service/service.service";
import { Usuario } from '../../Modelo/usuario';

@Component({
  selector: "app-getPageUsuario",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.scss"]
})
export class getPageUsuario implements OnInit{

    usuario!:Usuario[];
    constructor(private service:ServiceService, private router:Router){}

    ngOnInit(){
      this.service.getPageUsuario().subscribe(data=>{this.usuario=data;})

    }

    View(usuario:Usuario):void{
      localStorage.setItem("id",usuario.idusuario.toString());
      this.router.navigate(["ViewUsuario"]);
    }

    Editar(usuario:Usuario):void{
      localStorage.setItem("id",usuario.idusuario.toString());
      this.router.navigate(["EditUsuario"]);
    }

    Delete(usuario:Usuario):void{
      this.service.deleteUser(usuario).subscribe(data=>{this.usuario=this.usuario?.filter(u=>u!==usuario);
        alert("Usuario eliminado correctamente"); })
        this.router.navigate(["getPageUsuario"]);
    }

    Volver(){        
      this.router.navigate(["home"]);
    }
}
