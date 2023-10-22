import { Component, OnInit } from '@angular/core';
import { Pedido } from '../models/pedido';
import { PedidoService } from '../service/pedido.service';
import { Estado } from '../models/Estado';



@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  
  llego: String = ''
  pedidos: Pedido[] = [];
  buscados: any[] = [];

  busqueda = {
    fecha_pedidoDesde: '',
    fecha_pedidoHasta: '', 
    provedor: '',
    via: '',
    n_pedido: '',
    n_factura: '',
    n_remito: '',
    llego: '',
    fecha_llegada: '',
    estado: '',
    clienteNombre: '',
    responsable: ''
  };

  constructor(
    private pedidoService: PedidoService,


  ) { }

  ngOnInit(): void {
    this.filtro();
  }

  volver():void{
    window. history. back();
  }
  
  filtro(): void {
    this.pedidoService.filtro(this.busqueda).subscribe(
      data => {
        this.buscados = data;
      },
      err => {
        console.log(err);
      }
    );
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


