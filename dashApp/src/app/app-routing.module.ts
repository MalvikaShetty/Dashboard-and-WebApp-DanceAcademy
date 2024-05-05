import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassesComponent } from './pages/classes/classes.component';
import { DashComponent } from './pages/dash/dash.component';
import { InstAndStaffComponent } from './pages/inst-and-staff/inst-and-staff.component';
import { StudentsComponent } from './pages/students/students.component';
// import { PaymentFeesComponent } from './payment-fees/payment-fees.component';
import { PaymentFormComponent } from './pages/payment-form/payment-form.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {path:'dash',component:DashComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
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
