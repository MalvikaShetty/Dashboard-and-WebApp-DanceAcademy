import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { User } from 'src/app/models/Users/user.models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  user: User = new User();
  errorMessage: string = '';


  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  
  onRegister(): void {
    this.authService.register(this.user).subscribe({
      next: (user) => {
        console.log('Registration successful', user);
        localStorage.setItem('username', user.username);
        // Redirect or clear form here
        this.router.navigate(['/dash']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        this.errorMessage = 'Registration failed. Please try again.';
      }
    });
  }
}
