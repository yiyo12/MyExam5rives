import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { ListPersonasComponent } from './components/list-personas/list-personas.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/Persona',
    pathMatch: 'full'
  },
  {
    path: 'Persona',
    component: ListPersonasComponent,
  },
  {
    path: 'Persona/agregar',
    component: FormComponent,
  },
  {
    path: 'Persona/editar/:idCliente',
    component: FormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
