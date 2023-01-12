import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassesComponent } from './classes/classes.component';
import { DashComponent } from './dash/dash.component';

const routes: Routes = [
  {path:'',component:DashComponent},
  {path:'classes',component:ClassesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
