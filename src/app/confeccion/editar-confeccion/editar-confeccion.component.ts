import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Confeccion } from 'src/app/models/confeccion';
import { ConfeccionService } from 'src/app/service/confeccion.service';

@Component({
  selector: 'app-editar-confeccion',
  templateUrl: './editar-confeccion.component.html',
  styleUrls: ['./editar-confeccion.component.css']
})
export class EditarConfeccionComponent implements OnInit {

  confeccion!: Confeccion

  constructor(
    private activatedRoute: ActivatedRoute,
    private confeccionService: ConfeccionService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.toastr.clear();

    this.confeccion = {

      ancho: 0,//
      alto: 0,//
      apertura: '',//
      accesorios: '',//
      ambiente: '',//
      observaciones: '',//
      clienteNombre: '',//
      fecha_pedido: '',//
      fecha_entrega: '',
      estado: '',
      llego: false
    }

    const id = this.activatedRoute.snapshot.params['id'];
    this.confeccionService.uno(id).subscribe(
      data => {
        this.confeccion = data;
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
    this.confeccionService.editar(id, this.confeccion).subscribe(
      data => {
        this.toastr.success('Presupuesto editado', 'OK', {
          timeOut: 2500,
          positionClass: 'toast-center-center'
        });
        this.router.navigate(['/confeccion/lista'])
      },
      err => {
        this.toastr.error(err.error, 'ERROR', {
          timeOut: 5000,
          positionClass: 'toast-center-center'
        });
        this.router.navigate(['/confeccion/lista'])
        console.log(err);
      }
    );
  }

  borrar(id: number): void {
    this.confeccionService.borrar(id).subscribe(
      response => {
        this.toastr.success("PRESUPUESTO eliminado", 'OK', {
          timeOut: 5000,
          positionClass: 'toast-center-center'
        });
      },
      error => {
        console.error('Error al eliminar:', error);
        this.toastr.error("No se pudo eliminar el PRESUPUESTO", 'ERROR', {
          timeOut: 5000,
          positionClass: 'toast-center-center'
        });
      }
    );
  }
}
