import { Component } from '@angular/core';
import { CotizadorService } from '../service/cotizador.service';
import { CompileIdentifierMetadata } from '@angular/compiler';

@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html',
  styleUrls: ['./cotizador.component.css']
})
export class CotizadorComponent {
  telaN: string = "";
  alto: number = 0;
  ancho: number = 0;
  sistema: string = "";
  resultado: any;
  error: string = "";
  telas: any[] = [];
  mecanismos: any[] = [];
  mecanismoN: string = "";
  area: number = 0;

  precioTela: number = 0;
  precioSistema: number = 0;

  cotizaciones: any[] = [];
  sumatoria: number = 0;

  constructor(private cotizadorService: CotizadorService) { }

  onTelaChange() {
    const selectedTela = this.telas.find(t => t.tela === this.telaN);
    this.precioTela = selectedTela ? selectedTela.precio : 0;
  }

  onMecanismoChange() {
    const selectedMecanismo = this.mecanismos.find(m => m.tela === this.mecanismoN);
    this.precioSistema = selectedMecanismo ? selectedMecanismo.precio : 0;
  }

  onSistemaChange(): void {
    this.telaN = '';
    this.mecanismoN = '';
    this.telas = [];
    this.mecanismos = [];
    this.precioTela = 0;
    this.precioSistema = 0;
    this.resultado = 0;

    if (this.sistema) {
      this.cotizadorService.getTelas(this.sistema).subscribe(
        data => this.telas = data,
        error => {
          this.error = 'Error al cargar las telas disponibles';
          this.telas = [];
        }
      );
      this.cotizadorService.getSistemas(this.sistema).subscribe(
        data => this.mecanismos = data,
        error => {
          this.error = 'Error al cargar los mecanismos disponibles';
          this.mecanismos = [];
        }
      );
    }
  }

  calcularArea(): number {
    return this.alto * this.ancho / 10000;
  }

  cotizar(): void {
    const area = this.calcularArea();
    this.cotizadorService.cotizar(this.telaN, this.alto, this.ancho, this.sistema)
      .subscribe(
        data => {
          this.resultado = data;
          this.error = "";
          console.log(this.resultado);

        },
        error => {
          this.resultado = null;
          this.error = error.error.text;
          console.log(error.error.text);

        }
      );
  }
  agregarCotizacion(): void {
    if (this.resultado) {
      this.cotizaciones.push(this.resultado);
      this.sumatoria += this.resultado;
      this.resultado = null;
    }
  }
  borrar():void{
    this.cotizaciones = []
    this.sumatoria = 0
  }
}
