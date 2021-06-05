import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from './Modelo/login';
import { Usuario } from './Modelo/usuario';
import { ServiceService } from './Service/service.service';
import { StorageService } from './Service/storage.service';

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

  
  constructor(private router:Router, public activatedRoute:ActivatedRoute, private service:ServiceService, private storage: StorageService){ 
    this.isMasterSel = false;
  }
  
  ngOnInit(){
    
    let token = localStorage.getItem("token");
    let id= localStorage.getItem("idUsuario");
    let nombreUsuario = localStorage.getItem('nombreUsuario');

  }
 
  recuperarIdUsuario(){
    return localStorage.getItem('idUsuario');
  }

  mostrarUsuario(){
    console.log('nombreUsuario:'+localStorage.getItem('nombreUsuario'));
    return localStorage.getItem('nombreUsuario');
  }

    ViewUser(){
      let idUsuario = String(localStorage.getItem("idUsuario"));
      localStorage.setItem('id', idUsuario);
      this.router.navigate(['app-PersonalView']);
      
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
      this.router.navigate(["app-root"])
    }
    
}