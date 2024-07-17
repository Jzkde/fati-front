import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/service/pedido.service';


@Component({
  selector: 'app-editar',
  templateUrl: './editarPedido.component.html',
  styleUrls: ['./editarPedido.component.css']
})
export class EditarPedidoComponent implements OnInit {

  pedido!: Pedido
  id: number = 0 
  fecha_pedido: String = ''
  provedor: String = ''
  via: String = ''
  n_pedido: String = ''
  n_factura: String = ''
  n_remito: String = ''
  monto: number = 0
  llego: boolean = false
  fecha_llegada: String = ''
  estado: String = ''
  responsable: String = ''
  clienteNombre: String = ''
  observaciones: String = ''

  constructor(
    private activatedRoute: ActivatedRoute,
    private pedidoService: PedidoService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.toastr.clear();

    this.pedido = {
      id: 0,
      fecha_pedido: '',
      provedor: '',
      via: '',
      n_pedido: '',
      n_factura: '',
      n_remito: '',
      monto: 0,
      llego: false,
      fecha_llegada: '',
      estado: '',
      responsable: '',
      clienteNombre: '',
      observaciones: ""
    }
    const id = this.activatedRoute.snapshot.params['id'];
    this.pedidoService.uno(id).subscribe(
      data => {
        this.pedido = data;
        console.log(data);
      },
      err => {
        this.toastr.error(err.error, 'ERROR', {
          timeOut: 5000,
          positionClass: 'toast-center-center'
        });
        this.router.navigate(['/'])

      }
    );
  }
  editar(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.pedidoService.editar(id, this.pedido).subscribe(
      data => {
        this.toastr.success('Pedido editado', 'OK', {
          timeOut: 2500,
          positionClass: 'toast-center-center'
        });
        this.router.navigate(['/pedido/lista'])
      },
      err => {
        this.toastr.error(err.error, 'ERROR', {
          timeOut: 5000,
          positionClass: 'toast-center-center'
        });
        this.router.navigate(['/pedido/lista'])
      }
    );
  }
  borrar(id: number): void {
    this.pedidoService.borrar(id).subscribe(
      response => {
        this.toastr.success("PEDIDO eliminado", 'OK', {
          timeOut: 5000,
          positionClass: 'toast-center-center'
        });
      },
      error => {
        console.error('Error al eliminar:', error);
        this.toastr.error("No se pudo eliminar el PEDIDO", 'ERROR', {
          timeOut: 5000,
          positionClass: 'toast-center-center'
        });
      }
    );
  }
}
