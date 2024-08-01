export class Pedido {

    id?: number;
    fecha_pedido?: string;
    provedor: string;
    via: string;
    n_pedido: string;
    n_factura: string;
    n_remito: string;
    monto: number;
    llego?: boolean;
    fecha_llegada?: string;
    estado?: string;
    responsable: string;
    observaciones?: string;
    clienteNombre: string;

    constructor(
        provedor: string,
        via: string,
        n_pedido: string,
        n_factura: string,
        n_remito: string,
        monto: number,
        responsable: string,
        clienteNombre: string,
        observaciones?: string
    ) {
        this.provedor = provedor;
        this.via = via;
        this.n_pedido = n_pedido;
        this.n_factura = n_factura;
        this.n_remito = n_remito;
        this.monto = monto;
        this.clienteNombre = clienteNombre;
        this.responsable = responsable;
        this.observaciones = observaciones;
    }
}