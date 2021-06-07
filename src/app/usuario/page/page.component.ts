import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServiceService } from "src/app/Service/service.service";
import { Usuario } from '../../Modelo/usuario';
import swal from 'sweetalert2';
import { PdfMakeWrapper, Table, Txt } from "pdfmake-wrapper";
import { isEqual } from "date-fns";

@Component({
  selector: "app-getPageUsuario",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.scss"]
})
export class getPageUsuario implements OnInit{

  pdfMakerWrapper = new PdfMakeWrapper();

    usuario!:Array<Usuario>;
    totalPages!: Array<number>;

    page = 0;
    size = 4;
    order ='id';
    asc = true;

    isFirst = false;
    isLast = false;

    constructor(private service:ServiceService, private router:Router){}

    ngOnInit(){
      this.cargarUsuarios();

    }

    cargarUsuarios(){
      this.service.getPageUsuario(this.page, this.size, this.order, this.asc).subscribe
        (data=>{

          console.log(data);

          this.usuario = data.content;
          this.isFirst = data.first;
          this.isLast = data.last;
          this.totalPages = new Array(data.totalPages);

        })
        
    }

    //ordenar asc o desc
    sort():void{
      this.asc = !this.asc;
      this.cargarUsuarios();
    }

    //avanza pagina
    rewind():void{

      if(!this.isFirst){

        this.page--;
        this.cargarUsuarios();
      }
    }


    //retrocede pagina
    forward():void{

      if(!this.isLast){

        this.page++;
        this.cargarUsuarios();
      }
    }

    //cambia la pagina segun el numero
    setPage(page:number):void{
      
      this.page=page;
      this.cargarUsuarios();
    }

    //numero de cards
    setSize(size:number):void{

      this.size = size;
      this.cargarUsuarios();
    }

    //ordenar por
    setOrder(order: string): void {
      this.order = order;
      this.cargarUsuarios();
    }

    descargarPDF():void{

      this.service.getPageUsuario(this.page, this.size, this.order, this.asc).subscribe
        (data=>{

          console.log(data);

          this.usuario = data.content;
          this.isFirst = data.first;
          this.isLast = data.last;
          this.totalPages = new Array(data.totalPages);

          this.pdfMakerWrapper = new PdfMakeWrapper();

          this.pdfMakerWrapper.defaultStyle({

            fontSize: 15,

          });

          this.pdfMakerWrapper.pageSize('A4');

          this.pdfMakerWrapper.pageMargins([80, 40]);

          this.pdfMakerWrapper.header([
            new Txt('Listar usuarios').alignment('center').end
          ]);
          
          for(let item of data.content){
          
            this.pdfMakerWrapper.add(  
      
            new Table([
              ['idUsuario', item.id],
              ['Nombre de usuario', item.nombreusuario],
              ['Tipo de usuario', item.tipousuario.nombre],
              ['Nombre', item.nombre],
              ['Apellidos', item.apellidos],
              ['DNI', item.dni],
              ['Edad', item.edad],
              ['Sexo', item.sexo],
              ['Email', item.email],
              ['Localidad', item.localidad],
              ['Nacionalidad', item.nacionalidad],
              ['Teléfono', item.telefono]
              
            ]).widths([100, '*']).alignment('center').end
            
            );
      
          }
          
          this.pdfMakerWrapper.create().open();
        })     


    }

    View(usuario:Usuario):void{
      localStorage.setItem("id",usuario.id.toString());
      this.router.navigate(["ViewUsuario"]);
    }

    Crear(){

      this.router.navigate(["CreateUsuario"]);

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

          this.service.deleteUser(usuario).subscribe(data=>{this.usuario=this.usuario?.filter(u=>u!==usuario);
            alert("Usuario eliminado correctamente"); })
         

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
}
