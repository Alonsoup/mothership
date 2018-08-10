import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.component.html',
  styleUrls: ['./ejercicio.component.scss']
})
export class EjercicioComponent implements OnInit {

  constructor() { }

  secuencia = {
    id: "",
    reps: 0,
    rung: "L",
    steps: [],
    left: "",
    right: "",
    start: {
      left: "",
      right: ""
    }
  }
  secuencias = []
  rungs = ["1","2","3","4","5","6","7","8","9"]
  history = []

  ngOnInit() {
  }

  addStep(hand, step) {
    if (!this.secuencia.start.left || !this.secuencia.start.right) {
      this.secuencia.start[hand] = step;
      this.secuencia[hand] = step;
      return;
    }
    if (hand == 'double') {
      this.secuencia.left = step;
      this.secuencia.right = step;
    }

    this.secuencia.steps.push({hand: hand, step: step});
    this.secuencia[hand] = step;
  }

  generarId(sec) {
    let id = "";
    id += sec.rung;
    id += sec.start.left;
    id += sec.start.right;
    for (let i = 0; i < sec.steps.length; i++) {
      id += sec.steps[i].hand;
      id += sec.steps[i].step;
    }
    return id;
  }

  agregarSecuencia() {
    this.secuencia.id = this.generarId(this.secuencia);
    this.secuencias.push(this.secuencia);
    this.secuencia = {
      id: "",
      reps: 0,
      rung: "L",
      steps: [],
      left: "",
      right: "",
      start: {
        left: "",
        right: ""
      }
    };
  }

  eliminarDraft() {
    this.secuencia = {
      id: "",
      reps: 0,
      rung: "L",
      steps: [],
      left: "",
      right: "",
      start: {
        left: "",
        right: ""
      }
    };
  }

  borrarSecuencia(secIndex) {
    console.log(secIndex);
    this.secuencias.splice(secIndex, 1);
  }

  changeReps(secIndex, factor) {
    this.secuencias[secIndex].reps += factor;
    this.history.push(this.secuencias[secIndex].id);
    console.log(this.history);
  }

  duplicate(secIndex) {
    let original = JSON.parse(JSON.stringify(this.secuencias[secIndex]));
    let copy = JSON.parse(JSON.stringify(this.secuencias[secIndex]));
    copy.left = original.right;
    copy.right = original.left;
    copy.start.left = original.start.right;
    copy.start.right = original.start.left;

    for (let i = 0; i < original.steps.length; i++) {
      switch(original.steps[i].hand) {
        case 'left':
          copy.steps[i].hand = 'right';
          break;
        case 'right':
          copy.steps[i].hand = 'left';
          break;
        default:
          copy.steps[i].hand = 'double';
      }
    }
    copy.id = this.generarId(copy);
    this.secuencias.push(copy);
  }

  logStuff () {
    console.info('Secuencia: ' , this.secuencia);
    console.info('Secuencias: ', this.secuencias);
  }

}
