import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/models/Pedido';
import { PedidoService } from 'src/app/pedido/pedido.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

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
  cliente: String = ''
  responsable: String = ''
  observaciones: String = ''

  constructor(
    private router: Router,
    private PedidoService: PedidoService,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {
  }
  crear(): void {
    const npedido = new Pedido(
      this.provedor,
      this.via,
      this.n_pedido,
      this.n_factura,
      this.n_remito,
      this.monto,
      this.cliente,
      this.responsable,
    );
    this.PedidoService.nuevo(npedido).subscribe(
      data => {
        this.toastr.success('Pedido Guardado', 'OK', {

        });
        this.router.navigate(['/'])
        console.log(npedido);

      },
      err => {
        this.toastr.error(err.error.mensaje, 'ERROR', {
          timeOut: 5000,
          positionClass: 'toast-center-center'
        });
        this.router.navigate(['/'])
      }
    )

  }
}