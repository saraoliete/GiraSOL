export class Reserva{

    idreserva:bigint | undefined;
    id_usuario:bigint | undefined;
    id_pension:bigint | undefined;
    id_habitacion:bigint | undefined;
    cama_supletoria:boolean | undefined;

    //falta arreglar fechas
    fecha_llegada:String | undefined;
    fecha_final:String | undefined;

    precio_final:DoubleRange | undefined;
}