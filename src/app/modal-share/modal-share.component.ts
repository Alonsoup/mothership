import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  prueba: string
}

@Component({
  selector: 'app-modal-share',
  templateUrl: './modal-share.component.html',
  styleUrls: ['./modal-share.component.scss']
})
export class ModalShareComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalShareComponent>,
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
