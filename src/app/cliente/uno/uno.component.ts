import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Estado } from 'src/app/models/Estado';
import { Cliente } from 'src/app/models/cliente';
import { Pedido } from 'src/app/models/pedido';
import { Presupuesto } from 'src/app/models/presupuesto';
import { ClienteService } from 'src/app/service/cliente.service';
import { PedidoService } from 'src/app/service/pedido.service';
import { PresupuestoService } from 'src/app/service/presupuesto.service';

@Component({
  selector: 'app-uno',
  templateUrl: './uno.component.html',
  styleUrls: ['./uno.component.css']
})

export class UnoComponent implements OnInit {
  llego: String = ''

  constructor(
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private presupuestoService: PresupuestoService,
    private pedidoService: PedidoService,
    private toastr: ToastrService,
  ) { }

  cliente!: Cliente;
  presupuestos: Presupuesto[] = [];
  pedidos: any[] = [];

  ngOnInit(): void {
    this.toastr.clear();

    this.cliente = {
      nombre: '',
      apellido: '',
      direccion: '',
      telefono: '',
    }

    const id = this.activatedRoute.snapshot.params['id'];
    this.clienteService.uno(id).subscribe(
      data => {
        this.cliente = data;
      },
    );
    this.presupuestoService.filtrouno(id).subscribe(
      data => {
        this.presupuestos = data;
      },
    );
    this.pedidoService.filtrouno(id).subscribe(
      data => {
        this.pedidos = data;
      },
    );
  }
  actualizar(id: number, estado: String): void {
    const nActualizar = new Estado(
      this.llego = estado
    );
    this.pedidoService.actualizar(id, nActualizar).subscribe(
      data => {
        this.pedidos = data;
      },
      err => {
        console.log(err);
      }
    );

    window.location.reload();
  }

  volver():void{
    window. history. back();
  }
}