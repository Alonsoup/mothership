import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  prueba: string
}

@Component({
  selector: 'app-modal-save',
  templateUrl: './modal-save.component.html',
  styleUrls: ['./modal-save.component.scss']
})
export class ModalSaveComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalSaveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  workout_metadata = {
    title: '',
    description: ''
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
}
