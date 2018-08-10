import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibrosComponent } from './libros/libros.component';
import { ReceiptsComponent } from './receipts/receipts.component';
import { EjercicioComponent } from './ejercicio/ejercicio.component';

const routes: Routes = [
  {path: 'libros', component: LibrosComponent},
  {path: 'receipts', component: ReceiptsComponent},
  {path: 'ejercicio', component: EjercicioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
