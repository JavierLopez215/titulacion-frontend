export interface Reunion {
    id:number;
    titulo:string;
    descripcion:string;
    id_usuario_sol:number;
    id_usuario_ace:number;
    nombreA:string;
    fotoA:string;
    telefonoA:string;
    correoA:string;
    nombreS:string;
    telefonoS:string;
    fotoS:string;
    correoS:string
    fecha_sol:Date;
    fecha_ace: Date;
    hora: string;
    estado:string;
    activo:string
}