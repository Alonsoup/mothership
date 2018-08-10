import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.component.html',
  styleUrls: ['./ejercicio.component.scss']
})
export class EjercicioComponent implements OnInit {

  constructor() { }

  secuencia = {digits:[0,0,0,0,0], reps:0}
  secuencias = []

  ngOnInit() {
  }

  agregarDigito() {
    this.secuencia.digits.push(0);
  }

  agregarSecuencia() {
    this.secuencias.push(this.secuencia);
    this.secuencia = {digits:[0]};
  }

  changeReps(secIndex, factor) {
    this.secuencias[secIndex].reps += factor;
  }

  logStuff () {    
    console.info('Secuencia', this.secuencia);
  }

}
