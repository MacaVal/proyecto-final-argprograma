export class Experiencia {
    id?: number;
    cargo: string;
    nombre_empresa: string;
    es_actual: boolean;
    fecha_inicio: Date;
    fecha_fin: Date;
    descripcion: string;
    foto_experiencia: string;
    persona_id: number;
    tipo_empleo_id: number;

    constructor(cargo: string, nombre_empresa: string, es_actual: boolean, fecha_inicio: Date, fecha_fin: Date, descripcion: string, foto_experiencia: string, persona_id: number, tipo_empleo_id: number) {
        this.cargo = cargo;
        this.nombre_empresa = nombre_empresa;
        this.es_actual = es_actual;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.descripcion = descripcion;
        this.foto_experiencia = foto_experiencia;
        this.persona_id = persona_id;
        this.tipo_empleo_id = tipo_empleo_id;
    }
}