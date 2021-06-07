import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServiceService } from "src/app/Service/service.service";
import { Pension } from '../../Modelo/pension';
import swal from 'sweetalert2';
import { PdfMakeWrapper, Table, Txt } from "pdfmake-wrapper";
import { StorageService } from "src/app/Service/storage.service";

@Component({
  selector: "app-getPagePension",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.scss"]
})
export class getPagePension implements OnInit{

    pdfMakerWrapper = new PdfMakeWrapper();
    
    pension!: Array<any>;
    totalPages!: Array<number>;

    page = 0;
    size = 4;
    order ='id';
    asc = true;

    isFirst = false;
    isLast = false;

    constructor(private service:ServiceService, private storage:StorageService, private router:Router){}

    ngOnInit(){
      
      this.cargarPensiones();
         
      }

      esAdministrador():boolean {
        return this.storage.getCurrentSession()?.tipousuario.id == 1;
      }

      cargarPensiones(){

        this.service.getPagePension(this.page, this.size, this.order, this.asc).subscribe
        ((data: any)=>{
          
          console.log(data);
          
          this.pension = data.content;
          this.isFirst = data.first;
          this.isLast = data.last;
          this.totalPages = new Array(data.totalPages);
        }) 
      }

      //ordenar asc o desc
    sort():void{
      this.asc = !this.asc;
      this.cargarPensiones();
    }

    //avanza pagina
    rewind():void{

      if(!this.isFirst){

        this.page--;
        this.cargarPensiones();
      }
    }


    //retrocede pagina
    forward():void{

      if(!this.isLast){

        this.page++;
        this.cargarPensiones();
      }
    }

    //cambia la pagina segun el numero
    setPage(page:number):void{
      
      this.page=page;
      this.cargarPensiones();
    }

     //numero de cards
     setSize(size:number):void{

      this.size = size;
      this.cargarPensiones();
    }

    //ordenar por
    setOrder(order: string): void {
      this.order = order;
      this.cargarPensiones();
    }

    descargarPDF():void{

      this.service.getPagePension(this.page, this.size, this.order, this.asc).subscribe
        ((data: any)=>{
          
          console.log(data);
          
          this.pension = data.content;
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
            new Txt('Listar pensiones').alignment('center').end
          ]);
          
          for(let item of data.content){
          
            this.pdfMakerWrapper.add(  
      
            new Table([
              ['idPension', item.id],
              ['Tipo de pension', item.tipo],
              ['Descripcion', item.descripcion],
              ['Precio', item.precio]
              
            ]).widths([100, '*']).alignment('center').end
            
            );
      
          }
          
          this.pdfMakerWrapper.create().open();
        })     


    }

    View(pension:Pension):void{
      localStorage.setItem("id",pension.id.toString());
      this.router.navigate(["ViewPension"]);
    }

    Editar(pension:Pension):void{
      localStorage.setItem("id",pension.id.toString());
      this.router.navigate(["EditPension"]);
    }

    Delete(pension:Pension){

      swal.fire({
        title: '¿Estás seguro de que quieres eliminar la pensión ' + pension.id + '?',
        text: '¡No podrás recuperarla si decides eliminarla!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, quiero eliminarla',
        cancelButtonText: 'No, quiero guardarla'
      }).then((result) => {
        if(result.value){

          this.service.deletePension(pension).subscribe(data=>{
          this.pension = this.pension.filter(p => p!==pension)}
              )

          swal.fire(
            '¡Eliminada!',
            'La pensión ' + pension.id + ' ha sido eliminada.',
          )
          } else if (result.dismiss === swal.DismissReason.cancel){

            swal.fire(

              'Cancelado',
              'La pensión ' + pension.id + ' está segura.',
            )
          }
      })

      }

    Create(){

      this.router.navigate(["CreatePension"]);
    }

    Volver(){        
      this.router.navigate(["home"]);
    }
}
