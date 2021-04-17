import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServiceService } from "src/app/Service/service.service";
import { Usuario } from '../../Modelo/usuario';

@Component({
  selector: "app-ViewUsuario",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"]
})
export class ViewUsuario implements OnInit{

    usuario:Usuario = new Usuario();
    constructor(private service:ServiceService, private router:Router){}

    ngOnInit(){

      this.View();
    }

      View(){        
      let id = this.usuario.id!;
      localStorage.getItem("id");
      this.service.getUsuario(+id).subscribe(data=>{ this.usuario=data;})
    }

    EditUsuario(usuario:Usuario){        
      localStorage.setItem("id",usuario.id.toString());
      this.router.navigate(["EditUsuario"]);
    }

    Logout(usuario:Usuario){        
      localStorage.setItem("id",usuario.id.toString());
      this.router.navigate(["login"]);
    }

    Volver(){        
      this.router.navigate(["getPageUsuario"]);
    }
}