import { Component, OnInit } from '@angular/core';
import { Pedido } from '../models/pedido';
import { PedidoService } from '../service/pedido.service';
import { Estado } from '../models/Estado';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  dismissible = true;
  llego: String = ''
  pedidos: Pedido[] = [];
  buscados: any[] = [];

  busqueda = {
    pasaron: '',
    fecha_pedidoDesde: '',
    fecha_pedidoHasta: '',
    provedor: '',
    via: '',
    n_pedido: '',
    n_factura: '',
    n_remito: '',
    llego: 'false',
    fecha_llegada: '',
    estado: '',
    clienteNombre: '',
    responsable: ''
  };

  constructor(
    private pedidoService: PedidoService,
    private toastr: ToastrService,
  ) { }

  fechaActual = Date.now()

  ngOnInit(): void {
    this.filtro();
  }

  volver(): void {
    window.history.back();
  }
  parse(a: string) {
    Date.parse(a)
  }

  filtro(): void {
    this.toastr.clear();
    this.pedidoService.filtro(this.busqueda).subscribe(
      data => {
        this.buscados = data;
        this.buscados.forEach(pedido => {
          const fechapedido = Date.parse(pedido.fecha_pedido)
          const pasaron = Math.floor((this.fechaActual - fechapedido) / (1000 * 60 * 60 * 24))
          pedido.pasaron = pasaron
          if (pasaron > 20 && !pedido.llego) {
            this.toastr.error('ID: '+pedido.id + ' - Para: ' + pedido.clienteNombre, 'Pasaron ' + pedido.pasaron + ' Dias desde el pedido', {
              disableTimeOut: true,
              positionClass: 'toast-bottom-right',
            });
          }
        })
      },
      err => {
        console.log(err);
      }
    );
  }

  alerts = this.buscados;

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  borrarFiltros(): void {
    this.busqueda.fecha_pedidoDesde = '',
      this.busqueda.fecha_pedidoHasta = '',
      this.busqueda.provedor = '',
      this.busqueda.via = '',
      this.busqueda.n_pedido = '',
      this.busqueda.n_factura = '',
      this.busqueda.n_remito = '',
      this.busqueda.llego = '',
      this.busqueda.fecha_llegada = '',
      this.busqueda.estado = '',
      this.busqueda.clienteNombre = '',
      this.busqueda.responsable = ''
    this.filtro();
  }

  actualizar(id: number, estado: String): void {
    const nActualizar = new Estado(
      this.llego = estado
    );
    this.pedidoService.actualizar(id, nActualizar).subscribe(
      data => {
        this.pedidos = data;
      },
      err => {
        console.log(err);
      }
    );
    window.location.reload();
  }
}