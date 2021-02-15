import { Component } from '@angular/core';
import { Router } from '@angular/router';


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
      this.router.navigate(["getPageHabitacion"])
    }
    
}