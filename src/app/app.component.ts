import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Habitacion } from './Modelo/habitacion';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'girasol';

  constructor(private router:Router){}

    Login(){    
       this.router.navigate(["login"]);
    }
    
    Register(){      
      this.router.navigate(["CreateUsuario"]);
    }

    Habitacion(){      
      this.router.navigate(["getPageHabitacion"]);

    }

    Pension(){
      this.router.navigate(["getPagePension"]);

    }

    Usuario(){
      this.router.navigate(["getPageUsuario"]);
    }

    Reserva(){
      this.router.navigate(["getPageReserva"]);
    }
    
  
}