import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassesComponent } from './classes/classes.component';
import { DashComponent } from './dash/dash.component';
import { InstAndStaffComponent } from './inst-and-staff/inst-and-staff.component';
import { StudentsComponent } from './students/students.component';
// import { PaymentFeesComponent } from './payment-fees/payment-fees.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';

const routes: Routes = [
  {path:'',component:DashComponent},
  {path:'classes',component:ClassesComponent},
  {path:'inststaff',component:InstAndStaffComponent},
  {path:'students',component:StudentsComponent},
  {path:'paymentfees',component:PaymentFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
