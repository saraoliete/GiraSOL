import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from './Modelo/login';
import { Usuario } from './Modelo/usuario';
import { ServiceService } from './Service/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'girasol';
  isMasterSel:boolean;
  usuario:Usuario = new Usuario();
  check!:number;

  
  constructor(private router:Router, public activatedRoute:ActivatedRoute, private service:ServiceService){ 
    this.isMasterSel = false;
  }
  
  ngOnInit(){
    
    let token = localStorage.getItem("token");
    let id= localStorage.getItem("id");

    if(token!=null){

      this.service.getUsuario(id).subscribe(data=>{ this.usuario=data;});

      console.log(token);
    }

  }

    ViewUser(usuario:Usuario){

      localStorage.setItem('id', usuario.id.toString());
      this.router.navigate(['ViewUsuario']);
      
    }

    Login(){    
       this.router.navigate(["Login"]);
    }
    
    Register(){      
      this.router.navigate(["RegisterUsuario"]);
    }

    Habitacion(){
      this.router.navigate(["getPageHabitacion"])
    }

    Pension(){
      this.router.navigate(["getPagePension"])
    }

    Usuarios(){
      this.router.navigate(["getPageUsuario"])
    }

    Reservas(){
      this.router.navigate(["getPageReserva"])
    }

    Usuario(){
      this.router.navigate(["ViewUsuario"])
    }

    checkUncheck(){
      this.isMasterSel = !this.isMasterSel;
    }

    home(){
      this.router.navigate(["home"])
    }
    
}