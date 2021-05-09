import { Habitacion } from "./habitacion";
import { Pension } from "./pension";
import { Usuario } from "./usuario";

export class Reserva{

    id!:Number;
    usuario:Usuario = new Usuario();
    pension:Pension = new Pension();
    habitacion:Habitacion = new Habitacion();
    cama_supletoria:boolean | undefined;

    fecha_llegada:Date | undefined;
    fecha_final:Date | undefined;

    precio_final!:number;


}