import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  role: boolean = false;
  isLoggedIn: boolean = false;
  private authSubscription?: Subscription;

  constructor(private router: Router, public authservice:AuthService) {}
  
  ngOnInit(): void {
    this.authSubscription = this.authservice.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;
    });
    this.loadRole();
  }
  loadRole(): void {
    let userString = localStorage.getItem('currentUser');
    if (userString) {
      let user = JSON.parse(userString);
      user.role = 'Admin';
      this.role = true;
    } else {
      this.role = false;
    }
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}
