import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-nuevoCliente',
  templateUrl: './nuevoCliente.component.html',
  styleUrls: ['./nuevoCliente.component.css']
})
export class NuevoClienteComponent implements OnInit {

  nombre: String = ''
  apellido: String = ''
  direccion: String = ''
  telefono: String = ''

  ngOnInit(): void { }

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private toastr: ToastrService,
  ) { }

  crear(): void {
    const cliente = new Cliente(
      this.nombre,
      this.apellido,
      this.direccion,
      this.telefono,
    );
    this.clienteService.nuevo(cliente).subscribe(
      data => {
        this.toastr.success('Cliente Creado', 'OK', {
        });
        this.router.navigate(['/cliente/lista'])
      },
      err => {
        this.toastr.error(err.message, 'ERROR', {
          timeOut: 5000,
          positionClass: 'toast-center-center'
        });
        this.router.navigate(['/cliente/lista'])
      }
    )

  }



}
