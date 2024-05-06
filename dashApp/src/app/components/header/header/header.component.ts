import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  username: string = "Account";
  private authSubscription?: Subscription;

  constructor(private router: Router, public authservice: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authservice.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;
      this.username = user ? user.username : 'Account';
    });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

}
