export class Cliente {

    id?: number;
    nombre: String;
    apellido: String;
    direccion: String;
    telefono: String;

    constructor(

        nombre: String,
        apellido: String,
        direccion: String,
        telefono: String

    ) {

        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.telefono = telefono;


    }
}