import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/Users/user.models';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = "https://localhost:44316/api/Auth";
  private currentUserSubject: BehaviorSubject<User | null>; // Correctly typed to include null
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient, private router: Router,  private socialAuthService: SocialAuthService ) {
    // Proper initialization to handle null
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, user)
      .pipe(tap(res => {
        localStorage.setItem('currentUser', JSON.stringify(res.user));
        localStorage.setItem('token', res.token);  // Assuming the server returns an object with a user and token
        this.currentUserSubject.next(res.user);
      }));
  }
  googleLogin(idToken: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/google-login`, { idToken })
      .pipe(tap(res => {
        localStorage.setItem('currentUser', JSON.stringify(res.user));
        localStorage.setItem('token', res.token);
        this.currentUserSubject.next(res.user);
      }));
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(googleUser => {
      this.googleLogin(googleUser.idToken).subscribe();
    }).catch(error => {
      console.error('Google Sign-In error:', error);
    });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
}

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }

  refreshToken(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/refresh-token`, {}, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    }).pipe(tap((res) => {
      localStorage.setItem('token', res.token);
      console.log('Token refreshed!');
    }));
  }
}
