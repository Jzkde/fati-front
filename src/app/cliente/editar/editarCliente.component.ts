import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editarCliente.component.html',
  styleUrls: ['./editarCliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente!: Cliente

  constructor(
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {

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
      err => {
        this.toastr.error(err.error, 'ERROR', {
          timeOut: 5000,
          positionClass: 'toast-center-center'
        });
        this.router.navigate(['/cliente/lista'])
      }
    );
  }
  editar(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.clienteService.editar(id, this.cliente).subscribe(
      data => {
        this.toastr.success('Cliente modificado', 'OK', {
          timeOut: 2500,
          positionClass: 'toast-center-center'
        });
        this.router.navigate(['/cliente/lista'])
      },
      err => {
        this.toastr.error(err.error, 'ERROR', {
          timeOut: 5000,
          positionClass: 'toast-center-center'
        });
        this.router.navigate(['/cliente/lista'])
      }
    );
  }
}
