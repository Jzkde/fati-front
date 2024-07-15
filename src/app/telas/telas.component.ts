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

  archivo: File | null = null;
  message: string = '';
  marca: string = '';
  nuevaTela: Telas = { tela: '', precio: 0, esTela: false, sistema: "VACIO" };
  telas: Telas[] = [];
  porcen: number = 0;

  constructor(
    private telasService: TelasService,
    private toastr: ToastrService,
  ) { }

  archivoSelec(event: any) {
    this.archivo = event.target.files[0];
  }
  carga() {
    if (this.archivo) {
      this.telasService.uploadFile(this.marca, this.archivo).subscribe(
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
    this.telas.push({ ...this.nuevaTela });
    this.nuevaTela = { tela: '', precio: 0, esTela: false, sistema: "VACIO" };
  }

  guardar() {
    this.telasService.saveData(this.marca, this.telas).subscribe(response => {
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
        },
        error => {
          console.error('Error:', error);
          this.toastr.error(error.error, 'ERROR', {
            timeOut: 5000,
            positionClass: 'toast-center-center'
          });          
          console.log(error.error);
          
        }
      );
    } else {
      this.message = 'Porcentaje no especificado';
      console.log('Porcentaje no especificado');
    }
  }
  
}