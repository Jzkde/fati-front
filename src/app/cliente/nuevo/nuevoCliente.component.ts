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

  nombre: string = ''
  apellido: string = ''
  direccion: string = ''
  telefono: string = ''

  ngOnInit(): void {
    this.toastr.clear();
  }

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
        this.toastr.error(err.error, 'ERROR', {
          timeOut: 5000,
          positionClass: 'toast-center-center'
        });
      }
    )

  }



}
