import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  username = localStorage.getItem('username');

  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!this.username;  // Convert username presence into a boolean
  }

  logout(): void {
    localStorage.removeItem('username');
    this.username = null; 
    this.router.navigate(['/login']);
  }
}
