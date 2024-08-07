import { Component } from '@angular/core';
import { TelasService } from '../service/telas.service';
import { Telas } from '../models/telas';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-telas',
  templateUrl: './telas.component.html',
  styleUrls: ['./telas.component.css']
})
export class TelasComponent {

  isCollapsed1 = true;
  isCollapsed2 = true;
  isCollapsed3 = true;

  archivo: File | null = null;
  message: string = '';
  marca: string = '';

  telas: Telas[] = [];
  nuevaTela: Telas = {
    id: 0,
    tela: '',
    precio: 0,
    esTela: false,
    sistema: "VACIO"
  };

  servs: any[] = []
  nuevoServ: any = {
    id: 0,
    tipo: '',
    precio: 0
  };

  porcen: number = 0;
  prod: any[] = []

  constructor(
    private telasService: TelasService,
    private toastr: ToastrService,
  ) { }

  archivoSelec(event: any) {
    this.archivo = event.target.files[0];
  }

  carga() {
    if (this.archivo) {
      this.telasService.cargar(this.marca, this.archivo).subscribe(
        (response: string) => {
          this.message = response;
          console.log(this.message);
          this.toastr.success(this.message, 'OK', {
            timeOut: 5000,
            positionClass: 'toast-center-center'
          });
        },
        (error: string) => {
          this.message = error;
          console.log(this.message);
        }
      );
    } else {
      this.message = 'Por favor, seleccione un archivo.';
      this.toastr.error(this.message, 'ERROR', {
        timeOut: 5000,
        positionClass: 'toast-center-center'
      });
    }
  }

  agregar() {
    if (this.marca == "fati") {
      this.servs.push({ ...this.nuevoServ });
      this.nuevoServ = { id: 0, tipo: '', precio: 0 };
    } else {
      this.telas.push({ ...this.nuevaTela });
      this.nuevaTela = { id: 0, tela: '', precio: 0, esTela: false, sistema: "ROLLER" };
    }
  }

  esValido(): boolean {
    if (this.marca == 'fati') {
      return (this.servs.length > 0);
    } else {
      return (this.telas.length > 0 && this.marca !== '');
    }
  }

  guardar() {
    this.prod = this.marca === 'fati' ? this.servs : this.telas;
    this.telasService.nuevo(this.marca, this.prod).subscribe(response => {
      this.servs = [];
      this.telas = [];
      this.toastr.success("Productos cargados exitosamente", 'OK', {
        timeOut: 5000,
        positionClass: 'toast-center-center'
      });
    }, error => {
      console.error('Error saving data:', error);
    });
  }

  masivo() {
    if (this.porcen) {
      this.telasService.masivo(this.marca, this.porcen).subscribe(
        response => {
          this.toastr.success(response, 'OK', {
            timeOut: 5000,
            positionClass: 'toast-center-center'
          });
          this.porcen = 0
        },
        error => {
          if (error.error == "No hay TELAS cargadas") {
            console.error('Error:', error.error);
            this.toastr.error(error.error, 'ERROR', {
              timeOut: 5000,
              positionClass: 'toast-center-center'
            });
            console.log(error.error);
          } else {
            console.error('Error:', error);
            this.toastr.error("Provedor NO seleccionado", 'ERROR', {
              timeOut: 5000,
              positionClass: 'toast-center-center'
            })
          };
        }
      );
    } else {
      this.message = 'Porcentaje no especificado';
      this.toastr.error("Porcentaje NO especificado", 'ERROR', {
        timeOut: 5000,
        positionClass: 'toast-center-center'
      })
    }
  }
}