import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServiceService } from "src/app/Service/service.service";
import { Tipousuario } from '../../Modelo/tipousuario';
import swal from 'sweetalert2';
import { PdfMakeWrapper, Table, Txt } from "pdfmake-wrapper";

@Component({
  selector: "app-getPageTipousuario",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.scss"]
})
export class getPageTipousuario implements OnInit{

  pdfMakerWrapper = new PdfMakeWrapper();

  Tipousuarios!: Array<any>;
  totalPages!: Array<number>;

  page = 0;
  size = 4;
  order ='id';
  asc = true;

  isFirst = false;
  isLast = false;

  constructor(private service:ServiceService, private router:Router){
  }

  ngOnInit(){
    this.cargarTipoUsuarios();
  }
  

  cargarTipoUsuarios(){
    this.service.getPageTipousuario(this.page, this.size, this.order, this.asc).subscribe
      (data=>{

        console.log(data);
        
        this.Tipousuarios = data.content;
        this.isFirst = data.first;
        this.isLast = data.last;
        this.totalPages = new Array(data.totalPages);

      })
      
  }

  //ordenar asc o desc
  sort():void{
    this.asc = !this.asc;
    this.cargarTipoUsuarios();
  }

  //avanza pagina
  rewind():void{

    if(!this.isFirst){

      this.page--;
      this.cargarTipoUsuarios();
    }
  }


  //retrocede pagina
  forward():void{

    if(!this.isLast){

      this.page++;
      this.cargarTipoUsuarios();
    }
  }

  //cambia la pagina segun el numero
  setPage(page:number):void{
    
    this.page=page;
    this.cargarTipoUsuarios();
  }

  //ordenar por
  setOrder(order: string): void {
    this.order = order;
    this.cargarTipoUsuarios();
  }

  descargarPDF():void{

    this.service.getPageTipousuario(this.page, this.size, this.order, this.asc).subscribe
    (data=>{

      console.log(data);
      
      this.Tipousuarios = data.content;
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
          new Txt('Listar tipos de usuario').alignment('center').end
        ]);
        
        for(let item of data.content){
        
          this.pdfMakerWrapper.add(  
    
          new Table([
            ['idTipousuario', item.id],
            ['Tipo de usuario', item.nombre]
            
          ]).widths([100, '*']).alignment('center').end
          
          );
    
        }
        
        this.pdfMakerWrapper.create().open();
      })     


  }

    View(Tipousuario:Tipousuario):void{
      localStorage.setItem("id",Tipousuario.id.toString());
      this.router.navigate(["app-ViewTipousuario"]);
    }

    Editar(Tipousuario:Tipousuario):void{
      localStorage.setItem("id",Tipousuario.id.toString());
      this.router.navigate(["app-EditTipousuario"]);
    }

    Create():void{

      this.router.navigate(["app-CreateTipousuario"]);

    }

    Delete(Tipousuario:Tipousuario){

      swal.fire({
        title: '¿Estás seguro de que quieres eliminar el tipo de usuario ' + Tipousuario.id + '?',
        text: '¡No podrás recuperarlo si decides eliminarlo!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, quiero eliminarlo',
        cancelButtonText: 'No, quiero guardarla'
      }).then((result) => {
        if(result.value){

          this.service.deleteTipousuario(Tipousuario).subscribe(data=>{
          this.Tipousuarios = this.Tipousuarios.filter(p => p!==Tipousuario)}
              )

          swal.fire(
            '¡Eliminado!',
            'El tipo de habitación ' + Tipousuario.id + ' ha sido eliminado.',
          )
          } else if (result.dismiss === swal.DismissReason.cancel){

            swal.fire(

              'Cancelado',
              'El tipo de habitación ' + Tipousuario.id + ' está seguro.',
            )
          }
      })

    }
}
