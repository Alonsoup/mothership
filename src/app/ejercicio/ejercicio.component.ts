import { Component, OnInit } from '@angular/core';
import { ModalShareComponent } from '../modal-share/modal-share.component';
import { ModalSaveComponent } from '../modal-save/modal-save.component';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import * as moment from 'moment';
import { AuthService } from '../core/auth.service';

interface Workout {
  "history": [string],
  "secuencias": [any],
  "date": string,
}

@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.component.html',
  styleUrls: ['./ejercicio.component.scss']
})
export class EjercicioComponent implements OnInit {
  workoutsCollection: AngularFirestoreCollection<Workout>;
  publicWorkoutsCollection: AngularFirestoreCollection<Workout>;
  workouts: Observable<Workout[]>
  publicWorkouts: Observable<Workout[]>
  constructor(
    public auth: AuthService,
    private afs: AngularFirestore,
    public dialog: MatDialog
  ) { }
  mode = ''
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
  timer = {
    counter: 0,
    runClock: null
  }
  chosenWorkout = <Workout>  {
    history: []
  }
  currentStep = 0

  ngOnInit() {
    this.auth.user.subscribe(user => {
      this.workoutsCollection = this.afs.collection(`users/${user.uid}/workouts`);
      this.workouts = this.workoutsCollection.valueChanges();
      this.publicWorkoutsCollection = this.afs.collection(`public_workouts`);
      this.publicWorkouts = this.publicWorkoutsCollection.valueChanges();
    })

  }

  changeMode(mode) {
    this.mode = mode;
  }

  startTimer() {
    console.log(moment())
  }

  stopTimer() {
    console.log('stopping')
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
    console.log(original);
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
    copy.reps = 0;
    console.log(copy);
    this.secuencias.push(copy);
  }

  logStuff () {
    console.info('Secuencia: ' , this.secuencia);
    console.info('Secuencias: ', this.secuencias);
  }

  guardar () {
    let date = moment().format("DD-MM-YYYY");
    let workout = {
      date: date,
      title: '',
      description: '',
      history: [],
      secuencias: []
    };

    if (this.mode == 'load') {
      workout.history = this.chosenWorkout.history;
      workout.secuencias = this.chosenWorkout.secuencias;
    } else if (this.mode == 'new') {
      workout.history = this.history;
      workout.secuencias = this.secuencias;
    }

    this.auth.user.subscribe(user => {
      if (!user) {
        console.log('No hay usuario. Inicia sesión.');
        return;
      }
      const dialogRef = this.dialog.open(ModalSaveComponent, {
        width: '250px'
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        workout.title = result.title;
        workout.description = result.description;
        let todaysWorkoutRef = this.afs.doc(`users/${user.uid}/workouts/${date}`);
        todaysWorkoutRef.set(workout, {merge: true});
      })

    })
    this.currentStep = 0;
    this.mode = 'load';
  }

  share(workout) {
    this.auth.user.subscribe(user => {
      if (!user) {
        console.log('No User. Go to login.');
        return;
      }

      const dialogRef = this.dialog.open(ModalShareComponent, {
        width: '250px',
        data: {prueba: 'holi'}
      });
      dialogRef.afterClosed().subscribe(result => {
        let date = moment().format("DD-MM-YYYY");
        workout.date = date;
        workout.title = result.title;
        workout.description = result.description;
        workout.creator = user.displayName;
        let publicWorkoutsRef = this.afs.doc(`public_workouts/${user.uid}${date}`);
        publicWorkoutsRef.set(workout, {merge: true});
      })
    })

  }

  chooseWorkout(workout) {
    console.log(workout);
    this.chosenWorkout = workout;
  }

  nextStep() {
    if (this.currentStep < this.chosenWorkout.history.length) {
      this.currentStep ++;
    }

  }
}
