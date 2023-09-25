import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pedido } from 'src/app/models/Pedido';
import { PedidoService } from '../pedido.service';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  pedido!: Pedido
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private pedidoService: PedidoService,
    private toastr: ToastrService,
    private router: Router
  ) { }


  ngOnInit(): void {

    this.pedido = {
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
      cliente: '',
      responsable: ''
    }
    const id = this.activatedRoute.snapshot.params['id'];
    this.pedidoService.uno(id).subscribe(
      data => {
        this.pedido = data;
        console.log(data)
      },
      err => {
        this.toastr.error(err.error.mensaje, 'ERROR', {
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
        this.router.navigate(['/'])
      },
      err => {
        this.toastr.error(err.mensaje, 'ERROR', { 
          timeOut: 5000,
          positionClass: 'toast-center-center'
        });
     //   this.router.navigate(['/'])
        console.log(this.pedido);
        

      }
    );
  }

}
