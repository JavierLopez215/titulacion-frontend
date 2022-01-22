

export interface Reunion {
    id:number;
    titulo:string;
    descripcion:string;
    id_usuario_sol:number;
    id_usuario_ace:number;
    nombreA:string;
    fotoA:string;
    nombreS:string;
    fotoS:string;
    fecha_sol:Date;
    fecha_ace: Date;
    hora: string;
    estado:string;
    activo:string
}