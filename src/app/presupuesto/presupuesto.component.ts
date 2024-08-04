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

  buscados: any[] = [];
  selectedPresupuestos: Presupuesto[] = [];
  presupuestoAgrupados: { cliente: string, items: Presupuesto[] }[] = [];


  tel: string = ''
  direcc: string = ''

  busqueda = {
    pasaron: '',
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
    responsable: '',
    tela: '',
    estela: 'false',
    sistema: '',
  };

  constructor(
    private presupuestoService: PresupuestoService,
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
    this.presupuestoService.filtro(this.busqueda).subscribe(
      data => {
        this.buscados = data;
        this.presupuestosCliente();
      },
      err => {
        console.error('Error al filtrar presupuestos:', err);
      }
    );
  }

  borrarFiltros(): void {
      this.busqueda.clienteNombre = '',
    this.filtro();
  }

  onPresupuestoSelect(presupuesto: Presupuesto, event: any): void {
    if (event.target.checked) {
      this.selectedPresupuestos.push(presupuesto);
    } else {
      const index = this.selectedPresupuestos.indexOf(presupuesto);
      if (index > -1) {
        this.selectedPresupuestos.splice(index, 1);
      }
    }
  }

  generarYDescargarPdf() {
    this.presupuestoService.generarPdf(this.tel, this.direcc, this.selectedPresupuestos).subscribe((response: Blob) => {
      // Obtener el tipo de contenido desde la respuesta
      const contentType = response.type;

      // Determinar el nombre del archivo en función del tipo de contenido
      let archivoN = 'presupuesto.zip';
      if (contentType.includes('pdf')) {
        archivoN = 'presupuesto.pdf';
      }

      // Crear un enlace temporal para descargar el archivo
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = archivoN;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      this.toastr.error("Los clientes NO coinciden", 'ERROR', {
        timeOut: 5000,
        positionClass: 'toast-center-center'
      });
    });
  }

   presupuestosCliente(): void {
    const agrupados = new Map<string, Presupuesto[]>();
    this.buscados.forEach(presupuesto => {
      const cliente = presupuesto.clienteNombre;
      if (!agrupados.has(cliente)) {
        agrupados.set(cliente, []);
      }
      agrupados.get(cliente)?.push(presupuesto);
    });
    this.presupuestoAgrupados = Array.from(agrupados, ([cliente, items]) => ({ cliente, items }));
  }
}