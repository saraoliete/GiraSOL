import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServiceService } from "src/app/Service/service.service";
import { Usuario } from '../../Modelo/usuario';
import swal from 'sweetalert2';

@Component({
  selector: "app-ViewUsuario",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"]
})
export class ViewUsuario implements OnInit{

    usuario:Usuario = new Usuario();
    constructor(private service:ServiceService, private router:Router){}

    ngOnInit(){

      let id= localStorage.getItem("id");
      this.service.getUsuario(id).subscribe(data=>{ this.usuario=data;});
    }

    EditUsuario(usuario:Usuario){        
      localStorage.setItem("id",usuario.id.toString());
      this.router.navigate(["EditUsuario"]);
    }

    Logout(usuario:Usuario){        
      localStorage.setItem("id",usuario.id.toString());
      this.router.navigate(["login"]);
    }

    Delete(usuario:Usuario):void{

      swal.fire({
        title: '¿Estás seguro de que quieres eliminar a ' + usuario.nombreusuario + '?',
        text: '¡No podrás recuperarla si decides eliminarla!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, quiero eliminarla',
        cancelButtonText: 'No, quiero guardarla'
      }).then((result) => {
        if(result.value){

         

          swal.fire(
            '¡Eliminada!',
            'El usuario ' + usuario.nombreusuario + ' ha sido eliminado.',
          )
          } else if (result.dismiss === swal.DismissReason.cancel){

            swal.fire(

              'Cancelado',
              'El usuario ' + usuario.nombreusuario + ' está segura.',
            )
          }
      })
    }

    Volver(){        
      this.router.navigate(["getPageUsuario"]);
    }
}