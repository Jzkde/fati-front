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
    viejo: 'false',
    comprado: 'false'
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
        this.resetfiltros()
      },
      err => {
        console.error('Error al filtrar presupuestos:', err);
      }
    );
  }

  borrarFiltros(): void {
      this.busqueda.clienteNombre = '',
      this.busqueda.comprado = '',
      this.busqueda.viejo = ''
    this.filtro();
  }

  resetfiltros(): void {
       this.busqueda.comprado = 'false',
      this.busqueda.viejo = 'false'
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

  comprar(id: number): void {
    this.presupuestoService.comprar(id).subscribe(
      response => {
        this.toastr.success("PRESUPUESTO Cortina Encargada", 'OK', {
          timeOut: 5000,
          positionClass: 'toast-center-center'
        });
      },
      error => {
        console.error('Error al eliminar:', error);
        this.toastr.error("No se pudo Encargar", 'ERROR', {
          timeOut: 5000,
          positionClass: 'toast-center-center'
        });
      }
    );
    this.filtro()
  }
}