import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSliderModule} from '@angular/material/slider';
import { ReactiveFormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
export const firebaseConfig = environment.firebaseConfig;
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { SlickModule } from 'ngx-slick';

import { CoreModule } from "./core/core.module";
import { LibrosComponent } from './libros/libros.component';
import { ReceiptsComponent } from './receipts/receipts.component';
import { EjercicioComponent } from './ejercicio/ejercicio.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ModalShareComponent } from './modal-share/modal-share.component';
import { ModalSaveComponent } from './modal-save/modal-save.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LibrosComponent,
    ReceiptsComponent,
    EjercicioComponent,
    UserProfileComponent,
    ModalShareComponent,
    ModalSaveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatSliderModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    SlickModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalShareComponent,
    ModalSaveComponent
  ]
})
export class AppModule { }
