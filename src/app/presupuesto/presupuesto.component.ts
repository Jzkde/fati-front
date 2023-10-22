import { Component, OnInit } from '@angular/core';
import { Presupuesto } from '../models/presupuesto';
import { PresupuestoService } from '../service/presupuesto.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.css']
})
export class PresupuestoComponent implements OnInit {

  presupuestos: Presupuesto[] = [];
  buscados: any[] = [];

  busqueda = {
    pasaron:'',
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
    private presupuestoService: PresupuestoService,
    private toastr: ToastrService,
  ) { }
  ngOnInit(): void {
    this.toastr.clear();
    this.filtro();
  }

  volver():void{
    window. history. back();
  }
  
  filtro(): void {
    this.presupuestoService.filtro(this.busqueda).subscribe(
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

  lista(): void {
    this.presupuestoService.lista().subscribe(
      data => {
        this.presupuestos = data;

        console.log(data);
      },
      err => {
        console.log(err);
      }

    );
  }
}
