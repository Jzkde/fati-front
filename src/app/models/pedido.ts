export class Pedido {

    id?: number;
    fecha_pedido?: String;
    provedor: String;
    via: String;
    n_pedido: String;
    n_factura: String;
    n_remito: String;
    monto: number;
    llego?: boolean;
    fecha_llegada?: String;
    estado?: String;
    cliente: String;
    responsable: String;
    observaciones?: String;

    constructor(

        provedor: String,
        via: String,
        n_pedido: String,
        n_factura: String,
        n_remito: String,
        monto: number,
        cliente: String,
        responsable: String
    ) {

        this.provedor = provedor;
        this.via = via;
        this.n_pedido = n_pedido;
        this.n_factura = n_factura;
        this.n_remito = n_remito;
        this.monto = monto;
        this.cliente = cliente;
        this.responsable = responsable;


    }
}