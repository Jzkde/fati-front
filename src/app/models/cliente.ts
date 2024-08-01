export class Cliente {

    id?: number;
    nombre: string;
    apellido: string;
    direccion: string;
    telefono: string;

    constructor(
        nombre: string,
        apellido: string,
        direccion: string,
        telefono: string
    ) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.telefono = telefono;
    }
}