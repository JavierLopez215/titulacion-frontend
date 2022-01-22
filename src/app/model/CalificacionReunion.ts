export interface CalificacionReunion {
    id: number;
    motivo_cal: string;
    calificacion : number;
    id_usuario_cali: number;
    id_usuario_rec: number;
    nombreC : string;
    fotoC : string;
    nombreR : string;
    fotoR : string;
    id_reunion_cal : number;
    creado : Date;
}