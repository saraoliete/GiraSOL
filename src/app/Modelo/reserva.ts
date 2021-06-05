import { Habitacion } from "./habitacion";
import { Pension } from "./pension";
import { Usuario } from "./usuario";

export class Reserva{

    id!:Number;
    usuario:Usuario = new Usuario();
    pension:Pension = new Pension();
    habitacion:Habitacion = new Habitacion();
    cama_supletoria:boolean | undefined;

    fecha_llegada!:Date;
    fecha_final!:Date;

    precio_final!:number;


}