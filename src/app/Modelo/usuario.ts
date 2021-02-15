export class Usuario {

    idusuario!:Number;
    nombreusuario:string | undefined;
    password:string | undefined;
    tipousuario:bigint | undefined;
    nombre:string | undefined;
    apellidos:string | undefined;
    dni:string | undefined;
    edad:number | undefined;
    sexo: CharacterData | undefined;
    email:string | undefined;
    localidad:string | undefined;
    telefono:number | undefined;
    token!:string;
    validado:boolean | undefined;
    activo:boolean | undefined;


}