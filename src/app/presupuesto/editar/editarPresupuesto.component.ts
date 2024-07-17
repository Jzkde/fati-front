import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Presupuesto } from 'src/app/models/presupuesto';
import { PresupuestoService } from 'src/app/service/presupuesto.service';

@Component({
  selector: 'app-editarPresupuesto',
  templateUrl: './editarPresupuesto.component.html',
  styleUrls: ['./editarPresupuesto.component.css']
})
export class EditarPresupuestoComponent implements OnInit {

  presupuesto!: Presupuesto

  constructor(
    private activatedRoute: ActivatedRoute,
    private presupuestoService: PresupuestoService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.toastr.clear();

    this.presupuesto = {
      id: 0,
      sistema: '',
      ancho: 0,
      alto: 0,
      comando: '',
      apertura: '',
      clienteNombre: "",
      accesorios: '',
      ambiente: '',
      observaciones: '',
    }

    const id = this.activatedRoute.snapshot.params['id'];
    this.presupuestoService.uno(id).subscribe(
      data => {
        this.presupuesto = data;
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
    this.presupuestoService.editar(id, this.presupuesto).subscribe(
      data => {
        this.toastr.success('Pedido editado', 'OK', {
          timeOut: 2500,
          positionClass: 'toast-center-center'
        });

        this.router.navigate(['/presupuesto/lista'])
      },
      err => {
        this.toastr.error(err.error, 'ERROR', {
          timeOut: 5000,
          positionClass: 'toast-center-center'
        });
        this.router.navigate(['/presupuesto/lista'])
        console.log(err);
      }
    );
  }
  borrar(id: number): void {
    this.presupuestoService.borrar(id).subscribe(
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
