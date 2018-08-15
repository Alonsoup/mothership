import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibrosComponent } from './libros/libros.component';
import { ReceiptsComponent } from './receipts/receipts.component';
import { EjercicioComponent } from './ejercicio/ejercicio.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  {path: 'libros', component: LibrosComponent, canActivate: [AuthGuard]},
  {path: 'receipts', component: ReceiptsComponent},
  {path: 'ejercicio', component: EjercicioComponent},
  {path: 'login', component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
