import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'https://localhost:44316/api/payment'; // adjust as necessary

  constructor(private http: HttpClient) { }

  createPaymentIntent(amount: any, studentId: any) {
    return this.http.post<{ client_secret: string }>(`${this.apiUrl}/create-payment-intent`, { amount, studentId });
  }
}
