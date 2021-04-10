import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from './Modelo/login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'girasol';
  isMasterSel:boolean;

  constructor(private router:Router, public login:Login, public activatedRoute:ActivatedRoute){ 
    this.isMasterSel = false;
  }

    Login(){    
       this.router.navigate(["Login"]);
    }
    
    Register(){      
      this.router.navigate(["CreateUsuario"]);
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
    
}