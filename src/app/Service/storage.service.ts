import {Injectable} from "@angular/core";
import { Router } from '@angular/router';
import { Usuario } from "../Modelo/usuario";

@Injectable()
export class StorageService {

    private localStorageService;

    constructor(private router: Router) {
        this.localStorageService = localStorage;
    }

      
    setCurrentSession(usuario:Usuario):void{
          this.localStorageService.setItem('currentUser', JSON.stringify(usuario));
     }

    getCurrentSession():Usuario | null{
          return JSON.parse(String(this.localStorageService.getItem('currentUser')));
    }
    
    removeCurrentSession()  {
        localStorage.removeItem("currentUser");
    }

}