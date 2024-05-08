import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { User } from 'src/app/models/Users/user.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  user: User = new User(); // Assuming User class has username, password, etc.
  errorMessage: string = '';
  userGoogle! : any;

  constructor(private authService: AuthService, 
              private router: Router) {}

  ngOnInit(): void {
    this.loginWithGoogle();
  }
  
  onLogin(): void {
    this.authService.login(this.user).subscribe({
      next: (user) => {
        console.log('Login successful', user);
        localStorage.setItem('username', user.username);
        // Redirect or clear form here
        this.router.navigate(['/dash']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    });
  }

  loginWithGoogle(): void {
    this.authService.signInWithGoogle();
    console.log('Google login successful');
    this.router.navigate(['/dash']);
  }

  // In your Angular component
onSignInSuccess(googleUser): void {
  console.log('Google login successful', googleUser);
  // Handle the successful login, e.g., navigate or load user data
  this.router.navigate(['/dashboard']);
}

  
}