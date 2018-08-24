import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AuthService } from '../core/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface DialogData {
  prueba: string
}

@Component({
  selector: 'app-modal-share',
  templateUrl: './modal-share.component.html',
  styleUrls: ['./modal-share.component.scss']
})
export class ModalShareComponent implements OnInit {
  metadataForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ModalShareComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public auth: AuthService,
    private fb: FormBuilder
  ) { }

  user = null;

  ngOnInit() {
    this.auth.user.subscribe(user => {
      this.user = user;
    })

    this.metadataForm = this.fb.group({
      title: ['', [
        Validators.required
      ]],
      description: ['', [
        Validators.required
      ]]
    });
  }

  get title() {
    return this.metadataForm.get('title');
  }

  get description() {
    return this.metadataForm.get('description');
  }

  close() {
    this.dialogRef.close();
  }

}
