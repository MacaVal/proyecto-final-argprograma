export class Aptitud {
    id?: number;
    nombre_aptitud: string;
    porcentaje: number;
    persona_id: number;

    constructor(nombre_aptitud: string, porcentaje: number, persona_id: number) {
        this.nombre_aptitud = nombre_aptitud;
        this.porcentaje = porcentaje;
        this.persona_id = persona_id;
    }
}