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
  check!:number;

  
  constructor(private router:Router, public activatedRoute:ActivatedRoute, private service:ServiceService, private storage: StorageService){ 
    this.isMasterSel = false;
  }
  
  ngOnInit(){
  }
 
  recuperarIdUsuario(){
    return this.storage.getCurrentSession()?.id;
  }

  mostrarUsuario(){
    return this.storage.getCurrentSession()?.nombreusuario;
  }

  esAdministrador():boolean {
    return this.storage.getCurrentSession()?.tipousuario.id == 1;
  }

    ViewUser(){
      let idUsuario = String(this.recuperarIdUsuario());
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

    Tipohabitacion(){

      this.router.navigate(["app-getPageTipohabitacion"])
    }

    Pension(){
      this.router.navigate(["getPagePension"])
    }

    Usuarios(){
      this.router.navigate(["getPageUsuario"])
    }

    Tipousuario(){

      this.router.navigate(["app-getPageTipousuario"])
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