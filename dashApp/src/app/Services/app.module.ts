import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashComponent } from './pages/dash/dash.component';
import { StudentsComponent } from './pages/students/students.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { InstAndStaffComponent } from './pages/inst-and-staff/inst-and-staff.component';
import { FormsModule } from '@angular/forms';
import { SearchfilterPipe } from './searchfilter.pipe';
import { PaymentFormComponent } from './pages/payment-form/payment-form.component';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HeaderComponent } from './components/header/header/header.component';
import { SideMenuComponent } from './components/side-menu/side-menu/side-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SideMenuComponent,
    HeaderComponent,
    DashComponent,
    StudentsComponent,
    ClassesComponent,
    InstAndStaffComponent,
    SearchfilterPipe,
    PaymentFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    // NgxStripeModule.forRoot(environment.STRIPE_KEY),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
