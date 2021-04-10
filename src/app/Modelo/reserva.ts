import { Habitacion } from "./habitacion";
import { Pension } from "./pension";
import { Usuario } from "./usuario";

export class Reserva{

    idreserva!:number;
    usuario!:Usuario;
    pension!:Pension;
    habitacion!:Habitacion;
    cama_supletoria:boolean | undefined;

    //falta arreglar fechas
    fecha_llegada:String | undefined;
    fecha_final:String | undefined;

    precio_final:DoubleRange | undefined;


}