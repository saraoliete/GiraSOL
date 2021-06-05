import {Injectable} from "@angular/core";
import { Router } from '@angular/router';
import { Usuario } from "../Modelo/usuario";

@Injectable()
export class StorageService {

    private localStorageService;
    private oCurrentSession:Usuario | null = null;

    constructor(private router: Router) {

        this.localStorageService = localStorage;
        this.oCurrentSession;
      }

      
      setCurrentSession(usuario:Usuario):void{
          
          this.oCurrentSession = usuario;
          
          console.log('current user: ' + this.localStorageService.setItem('currentUser', JSON.stringify(usuario)));
          
          return this.localStorageService.setItem('currentUser', JSON.stringify(usuario));
          
        }

        getCurrentSession():String | null{

            console.log('current user: ' + this.localStorageService.getItem('currentUser'));
            return this.localStorageService.getItem('currentUser');

        }

        setIdOfCurrentUser(usuario:Usuario):void{

            console.log('current id user: ' + this.localStorageService.setItem('currentUserId', JSON.stringify(usuario.id)));

            return this.localStorageService.setItem('currentUserId', JSON.stringify(usuario.id));
        }

        getIdOfCurrentUser():String | null{

            console.log('current id user: ' + this.localStorageService.getItem('currentUserId'));
            return this.localStorageService.getItem('currentUserId');

        }

        setNombreUsuarioOfCurrentUser(usuario:Usuario):void{

            this.oCurrentSession = usuario;

            console.log('current username: ' + this.localStorageService.setItem('currentUserName', JSON.stringify(usuario.nombreusuario)));

            return this.localStorageService.setItem('currentUserName', JSON.stringify(usuario.nombreusuario));

        }

        getNombreUsuarioOfCurrentUser():String | null{

            console.log('current username: ' + this.localStorageService.getItem('currentUserName'));
            return this.localStorageService.getItem('currentUserName');

        }

        setTipoUsuarioOfCurrentUser(usuario:Usuario):void{

            this.oCurrentSession = usuario;

            console.log('current user type: ' + this.localStorageService.setItem('currentUserType', JSON.stringify(usuario.tipousuario.id)));

            return this.localStorageService.setItem('currentUserType', JSON.stringify(usuario.tipousuario.id));
            
        }

        getTipoUsuarioOfCurrentUser():String | null{

            console.log('current user type: ' + this.localStorageService.getItem('currentUserType'));
            return this.localStorageService.getItem('currentUserType');
            
        }

        setTokenOfCurrentUser(usuario:Usuario):void{

            this.oCurrentSession = usuario;

            console.log('current user token: ' + this.localStorageService.setItem('currentUserName', JSON.stringify(usuario.token)));
            return this.localStorageService.setItem('currentUserToken', JSON.stringify(usuario.token));
            
        }

        getTokenOfCurrentUser():String | null{

            console.log('current user token: ' + this.localStorageService.getItem('currentUserToken'));
            return this.localStorageService.getItem('currentUserToken');
        }

     

}