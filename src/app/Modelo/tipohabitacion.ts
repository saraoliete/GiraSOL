import { FileImg } from "./file";

export class Tipohabitacion{

    id!:Number;
    nombre:String | undefined;
    numero_camas:number | undefined;
    descripcion:string | undefined;
    precio!:number;
    id_file!:Number;
}