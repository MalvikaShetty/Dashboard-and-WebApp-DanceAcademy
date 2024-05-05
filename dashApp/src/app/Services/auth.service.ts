import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/Users/user.models';
import { UpdateRoleDto } from '../models/Users/update-role.dto'; // Ensure you create this DTO model

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = "https://localhost:44316/api/Auth";

  constructor(private http: HttpClient) { }

  login(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/login`, user);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, user);
  }

  updateRole(username: string, role: string): Observable<any> {
    const roleUpdate: UpdateRoleDto = { role }; // Assuming role is just a string, adjust if the structure is different
    return this.http.post(`${this.baseUrl}/update-role/${username}`, roleUpdate);
  }
}
