export interface Publicacion {
    id: number;
    id_usuario_pub: number;
    nombre : string;
    foto : string;
    titulo: string;
    descripcion : string;
    estado : string;
    id_especialidad : number;
    especialidad : string;
    activo : string;
    creado : Date;
}