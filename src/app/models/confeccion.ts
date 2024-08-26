export class Confeccion {

    id?: number;
    ancho: number;
    alto: number;
    apertura: string;
    accesorios: string;
    ambiente: string;
    observaciones: string;
    clienteNombre: string;
    fecha_pedido?: string;
    fecha_entrega?: string;
    estado?: string;
    llego?: boolean;

    constructor(
        ancho: number,
        alto: number,
        apertura: string,
        accesorios: string,
        ambiente: string,
        observaciones: string,
        clienteNombre: string,
        llego?: boolean,
        fecha_pedido?: string,
        fecha_entrega?: string,
        estado?: string,

    ) {
        this.ancho = ancho
        this.alto = alto
        this.apertura = apertura
        this.accesorios = accesorios
        this.ambiente = ambiente
        this.observaciones = observaciones
        this.clienteNombre = clienteNombre
        this.fecha_pedido = fecha_pedido
        this.fecha_entrega = fecha_entrega
        this.llego = llego
        this.estado = estado








    }
}