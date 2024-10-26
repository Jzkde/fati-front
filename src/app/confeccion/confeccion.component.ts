import { Component } from '@angular/core';
import { Confeccion } from '../models/confeccion';
import { ConfeccionService } from '../service/confeccion.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confeccion',
  templateUrl: './confeccion.component.html',
  styleUrls: ['./confeccion.component.css']
})
export class ConfeccionComponent {
  confeccionesAgrupadas: { cliente: string, items: Confeccion[] }[] = [];

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
    responsable: '',
    tela: '',
    estela: 'false',
    sistema: '',
    viejo: 'false',
    comprado: 'false'
  };

  constructor(
    private confeccionService: ConfeccionService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.toastr.clear();
    this.filtro();
  }

  volver(): void {
    window.history.back();
  }

  filtro(): void {
    this.confeccionService.filtro(this.busqueda).subscribe(
      data => {
        this.buscados = data;
        this.confeccionesCliente();
        this.resetfiltros()
        //console.log(this.buscados);
      },
      err => {
        console.error('Error al filtrar confecciones:', err);
      }
    );
  }

  borrarFiltros(): void {
    this.busqueda.clienteNombre = ''
    this.busqueda.comprado = ''
    this.busqueda.viejo = ''
    this.busqueda.llego = ''
    this.filtro();
  }

  resetfiltros(): void {
    this.busqueda.comprado = 'false',
      this.busqueda.viejo = 'false'
  }

  confeccionesCliente(): void {
    const agrupados = new Map<string, Confeccion[]>();
    this.buscados.forEach(confeccion => {
      const cliente = confeccion.clienteNombre;
      if (!agrupados.has(cliente)) {
        agrupados.set(cliente, []);
      }
      agrupados.get(cliente)?.push(confeccion);
    });
    this.confeccionesAgrupadas = Array.from(agrupados, ([cliente, items]) => ({ cliente, items }));
  }
  entregar(id: number) {
    this.confeccionService.entregar(id).subscribe(
      response => {
        this.toastr.success("PRESUPUESTO Cortina Encargada", 'OK', {
          timeOut: 5000,
          positionClass: 'toast-center-center'
        });
      }
    )
    this.filtro
  }
}