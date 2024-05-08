import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { Subscription } from 'rxjs';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dashApp';
  isLoggedIn: boolean = false;
  private authSubscription?: Subscription;
  su!: SocialUser;

  constructor(private router: Router, public authservice:AuthService,private socialAuthService: SocialAuthService ) {}

  ngOnInit(): void {
    this.authSubscription = this.authservice.currentUser.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
        this.router.navigate(['/dash']);  // Navigate to dashboard if logged in
      } else {
        this.router.navigate(['/']);  // Navigate to login if not logged in
      }
    });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
  
}