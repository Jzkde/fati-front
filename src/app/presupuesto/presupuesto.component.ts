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
  selectedPresupuestos: Presupuesto[] = [];


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
    this.presupuestoService.generarPdf(this.selectedPresupuestos).subscribe((response: Blob) => {
      // Obtener el tipo de contenido desde la respuesta
      const contentType = response.type;
  
      // Determinar el nombre del archivo en función del tipo de contenido
      let fileName = 'presupuesto.zip';
      if (contentType.includes('pdf')) {
        fileName = 'presupuesto.pdf';
      }

      // Crear un enlace temporal para descargar el archivo
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error al generar el PDF:', error);
    });
  }
}