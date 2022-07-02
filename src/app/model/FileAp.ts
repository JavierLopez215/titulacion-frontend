import { Label } from "./Label";

export interface FileAp {
    id: number;
    id_usuario_apo: number;
    nombre:string;  
    foto:string;
    titulo:string;
    descripcion : string;
    archivo : string;
    tipo : string;
    activo : string;
    creado : Date;
    listaEtiquetas: Array<Label>;
}