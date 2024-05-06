import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { AuthInterceptor } from './Interceptor/auth.interceptor';
import { WelcomeComponent } from './pages/welcome/welcome/welcome.component';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider, GoogleSigninButtonModule, GoogleSigninButtonDirective} from '@abacritt/angularx-social-login';
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SocialLoginModule,
    GoogleSigninButtonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.googleClientId
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    GoogleSigninButtonDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
