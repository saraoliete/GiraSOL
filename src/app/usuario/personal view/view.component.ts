import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServiceService } from "src/app/Service/service.service";
import { Usuario } from '../../Modelo/usuario';
import swal from 'sweetalert2';
import { PdfMakeWrapper, Table, Txt } from "pdfmake-wrapper";

@Component({
  selector: "app-PersonalView",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"]
})
export class PersonalView implements OnInit{

    pdfMakerWrapper = new PdfMakeWrapper();

    usuario:Usuario = new Usuario();
    constructor(private service:ServiceService, private router:Router){}

    ngOnInit(){
      let id= localStorage.getItem("id");
      this.service.getUsuario(id).subscribe(data=>{ this.usuario=data;});
    }

    descargarPDF(){

      let id= localStorage.getItem("id");
      this.service.getUsuario(id).subscribe(data=>{ this.usuario=data;
      
        this.pdfMakerWrapper = new PdfMakeWrapper();
  
          this.pdfMakerWrapper.defaultStyle({
  
            fontSize: 15,
  
          });
  
          this.pdfMakerWrapper.pageSize('A4');
  
          this.pdfMakerWrapper.pageMargins([80, 40]);
  
          this.pdfMakerWrapper.header([
            new Txt('Usuario: ' + data.id).alignment('center').end
          ]);
          
          this.pdfMakerWrapper.add(  
      
            new Table([
              ['idUsuario', data.id],
              ['Nombre de usuario', data.nombreusuario],
              ['Tipo de usuario', data.tipousuario.nombre],
              ['Nombre', data.nombre],
              ['Apellidos', data.apellidos],
              ['DNI', data.dni],
              ['Edad', data.edad],
              ['Sexo', data.sexo],
              ['Email', data.email],
              ['Localidad', data.localidad],
              ['Nacionalidad', data.nacionalidad],
              ['Teléfono', data.telefono],
              
            ]).widths([100, '*']).alignment('center').end
            
            );
  
            this.pdfMakerWrapper.create().open();
      
      })
  
    }

    EditUsuario(usuario:Usuario){        
      localStorage.setItem("id",usuario.id.toString());
      this.router.navigate(["EditUsuario"]);
    }

    Logout(){        
      console.log("entra en el logout");
      
      swal.fire({
        title: '¿Quieres cerrar tu sesión como ' + this.usuario.nombreusuario + '?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'No cerrar sesión'
      }).then((result) => {
        if(result.value){

          localStorage.removeItem("token");
          localStorage.removeItem("idUsuario");
          localStorage.removeItem("nombreUsuario");

          swal.fire({
            title: '¡Correcto!',
            text: 'Tu sesión como ' + this.usuario.nombreusuario + ' ha sido cerrada correctamente.',
            icon: 'success'
          })

          this.router.navigate(["app-root"]);

          } else if (result.dismiss === swal.DismissReason.cancel){

            swal.fire({

              title: 'De acuerdo',
              text: 'Has decidido mantener tu sesión abierta.',
              icon: 'success'
            })
          }
      })
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
      this.router.navigate(["app-root"]);
    }
}