import { DetalleComentario } from "./DetalleComentario";

export interface Comentario {
    id:number;
    id_publicacion_com:number;
    id_usu_comenta:number;
    nombre:string;
    foto:string;
    comentario:string;
    calificacion:number;
    activo:string;
    creado: Date;
    listaDetalles:Array<DetalleComentario>;
    tipo: string;
    adjuntos:number;
}