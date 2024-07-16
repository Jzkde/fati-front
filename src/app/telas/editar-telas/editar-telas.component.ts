import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Telas } from 'src/app/models/telas';
import { TelasService } from 'src/app/service/telas.service';

@Component({
  selector: 'app-editar-telas',
  templateUrl: './editar-telas.component.html',
  styleUrls: ['./editar-telas.component.css']
})
export class EditarTelasComponent {

  buscados: any[] = [];
  marca: string = "";
  tela!: any

  busqueda = {
    id: 0,
    tela: '',
    estela: 'false',
    sistema: '',
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
    private telasService: TelasService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.toastr.clear();

    this.tela = {
      id: 0,
      tela: '',
      precio: 0,
      esTela: false,
      sistema: 'ROLLER'
    }
  }
  filtro(): void {
    this.telasService.filtro(this.marca, this.busqueda).subscribe(
      data => {
        this.buscados = data;
        if (data.length === 0) {
          this.toastr.error("No hay TELAS cargadas", 'ERROR', {
            timeOut: 5000,
            positionClass: 'toast-center-center'
          });
        }
      }
    )
  }
  filtroUno(id: number): void {
    this.telasService.filtroUno(this.marca, id).subscribe(
      data => {
        this.tela = data;
      }
    )
  }
  editar(id: number) {
    this.telasService.editar(this.marca, id, this.tela).subscribe(response => {
      this.tela = { id: 0, tela: '', precio: 0, esTela: false, sistema: 'ROLLER' };
      this.busqueda.tela = ""
      this.filtro();
      this.toastr.success("Tela Modificada", 'OK', {
        timeOut: 5000,
        positionClass: 'toast-center-center'
      });
    });
  }
  borrar(id: number): void {
    this.telasService.borrar(this.marca, id).subscribe(
      response => {
        console.log('Tela eliminada:', response);
        this.filtro(); 
        this.toastr.success("TELAS Eliminada", 'OK', {
          timeOut: 5000,
          positionClass: 'toast-center-center'
        });
      },
      error => {
        console.error('Error al eliminar:', error);
        this.toastr.error("No se pudo eliminar la TELA", 'ERROR', {
          timeOut: 5000,
          positionClass: 'toast-center-center'
        });
      }
    );
  }
}