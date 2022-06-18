export class Persona {
    id?: number;
    nombre: string;
    apellido: string;
    titulo: string;
    acerca_de_mi: string;
    url_foto: string;
    url_banner: string;

    constructor(nombre: string, apellido: string, titulo: string, acerca_de_mi: string, url_foto: string, url_banner: string) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.titulo = titulo;
        this.acerca_de_mi = acerca_de_mi;
        this.url_foto = url_foto;
        this.url_banner = url_banner;
    }
}