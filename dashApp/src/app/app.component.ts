import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dashApp';

  username = localStorage.getItem('username');

  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!this.username;  // Convert username presence into a boolean
  }
}