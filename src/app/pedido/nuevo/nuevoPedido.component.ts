import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from 'src/app/service/pedido.service';
import { ToastrService } from 'ngx-toastr';
import { Pedido } from 'src/app/models/pedido';

@Component({
  selector: 'app-nuevoPedido',
  templateUrl: './nuevoPedido.component.html',
  styleUrls: ['./nuevoPedido.component.css']
})
export class NuevoPedidoComponent implements OnInit {

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
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.toastr.clear();
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
      this.observaciones,
    );
    const id = this.activatedRoute.snapshot.params['id'];
    this.PedidoService.nuevo(id, npedido).subscribe(
      data => {
        this.toastr.success('Pedido Guardado', 'OK', {
        });
        this.router.navigate(['/pedido/lista'])
      },
      err => {
        this.toastr.error(err.error, 'ERROR', {
          timeOut: 5000,
          positionClass: 'toast-center-center'
        });
      }
    )

  }
}