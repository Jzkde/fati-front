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

    this.presupuesto = {
      sistema: '',
      ancho: 0,
      alto: 0,
      comando: '',
      apertura: '',
      accesorios: '',
      ambiente: '',
      observaciones: '',
    }

    const id = this.activatedRoute.snapshot.params['id'];
    this.presupuestoService.uno(id).subscribe(
      data => {
        this.presupuesto = data;
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
    this.presupuestoService.editar(id, this.presupuesto).subscribe(
      data => {
        this.toastr.success('Pedido editado', 'OK', {
          timeOut: 2500,
          positionClass: 'toast-center-center'
        });
        this.router.navigate(['/presupuesto/lista'])
      },
      err => {
        this.toastr.error(err.mensaje, 'ERROR', {
          timeOut: 5000,
          positionClass: 'toast-center-center'
        });
        this.router.navigate(['/presupuesto/lista'])
        console.log(err);
      }
    );
  }
}
