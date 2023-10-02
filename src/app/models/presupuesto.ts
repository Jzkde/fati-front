export class Presupuesto {

    id?: number;
    sistema: String;
    ancho: number;
    alto: number;
    comando: String;
    apertura: String;
    accesorios?: String;
    ambiente?: String;
    observaciones?: String;

    constructor(

        sistema: String,
        ancho: number,
        alto: number,
        comando: String,
        apertura: String,
        accesorios?: String,
        ambiente?: String,
        observaciones?: String,

    ) {

        this.sistema = sistema;
        this.ancho = ancho;
        this.alto = alto;
        this.comando = comando;
        this.apertura = apertura;
        this.accesorios =  accesorios
        this.ambiente =  ambiente
        this.observaciones =  observaciones

    }
}