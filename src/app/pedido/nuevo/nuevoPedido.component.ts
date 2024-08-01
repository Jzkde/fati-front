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

  fecha_pedido: string = ''
  provedor: string = ''
  via: string = ''
  n_pedido: string = ''
  n_factura: string = ''
  n_remito: string = ''
  monto: number = 0
  llego: boolean = false
  fecha_llegada: string = ''
  estado: string = ''
  responsable: string = ''
  cliente: string = ''
  observaciones: string = ''

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
      this.responsable,
      this.cliente,
      this.observaciones,
    );
    const id = this.activatedRoute.snapshot.params['id'];
    this.PedidoService.nuevo(npedido).subscribe(
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