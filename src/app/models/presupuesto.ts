export class Presupuesto {

    id?: number;
    sistema: string;
    ancho: number;
    alto: number;
    comando: string;
    apertura: string;
    accesorios?: string;
    ambiente?: string;
    observaciones?: string;
    clienteNombre: string;
    fecha?: string;

    constructor(
        sistema: string,
        ancho: number,
        alto: number,
        comando: string,
        apertura: string,
        clienteNombre: string,
        accesorios?: string,
        ambiente?: string,
        observaciones?: string,
    ) {
        this.sistema = sistema;
        this.ancho = ancho;
        this.alto = alto;
        this.comando = comando;
        this.apertura = apertura;
        this.accesorios = accesorios
        this.ambiente = ambiente
        this.observaciones = observaciones
        this.clienteNombre = clienteNombre
    }
}