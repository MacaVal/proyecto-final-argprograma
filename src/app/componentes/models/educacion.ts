export class Estudio {
    id?: number;
    nombre_instituto: string;
    en_curso: boolean;
    fecha_inicio: Date;
    fecha_fin: Date;
    descripcion: string;
    foto_educacion: string;
    persona_id: number;
    titulo_id: number;

    constructor(nombre_instituto: string, en_curso: boolean, fecha_inicio: Date, fecha_fin: Date, descripcion: string, foto_educacion: string, persona_id: number, titulo_id: number) {
        this.nombre_instituto = nombre_instituto;
        this.en_curso = en_curso;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.descripcion = descripcion;
        this.foto_educacion = foto_educacion;
        this.persona_id = persona_id;
        this.titulo_id = titulo_id;
    }
}