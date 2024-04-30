import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashComponent } from './dash/dash.component';
import { StudentsComponent } from './students/students.component';
import { ClassesComponent } from './classes/classes.component';
import { InstAndStaffComponent } from './inst-and-staff/inst-and-staff.component';
import { FormsModule } from '@angular/forms';
import { SearchfilterPipe } from './searchfilter.pipe';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
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
    NgxStripeModule.forRoot(environment.STRIPE_KEY),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
