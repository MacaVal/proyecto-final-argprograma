export class Proyecto {
    id?: number;
    nombre_proyecto: string;
    descripcion: string;
    foto_proyecto: string;
    url_proyecto: string;
    persona_id: number;

    constructor(nombre_proyecto: string, descripcion: string, foto_proyecto: string, url_proyecto: string, persona_id: number) {
        this.nombre_proyecto = nombre_proyecto;
        this.descripcion = descripcion;
        this.foto_proyecto = foto_proyecto;
        this.url_proyecto = url_proyecto;
        this.persona_id = persona_id;
    }
}