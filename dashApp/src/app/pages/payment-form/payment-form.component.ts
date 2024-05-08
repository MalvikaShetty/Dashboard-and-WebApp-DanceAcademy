import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment'; // Adjust the path as necessary
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  @ViewChild('paymentRef') paymentRef!: ElementRef;
  programId?: number;
  fees?: number;
  studentId?: number;
  showPaymentOptions: boolean = false;
  
  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
     // Retrieve the state object from ActivatedRoute
     this.route.paramMap.subscribe(params => {
      const state = window.history.state;
      if (state) {
        this.programId = state.programId;
        this.fees = state.fees;
        this.studentId = state.studentId;
      }
    });
   
  }

  togglePaymentOptions(): void {
        this.showPaymentOptions = !this.showPaymentOptions;
        this.loadPayPalScript(() => {
          if (window.paypal) {
            console.log('PayPal SDK successfully loaded.');
            this.initPayPalButton();
          } else {
            console.error('Failed to load the PayPal SDK');
          }
        });
      }

    cancel(){
      this.showPaymentOptions = !this.showPaymentOptions;
    }

  private loadPayPalScript(callback: () => void): void {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${environment.paypalClientId}&currency=USD`;
    script.onload = callback;
    document.body.appendChild(script);
  }

  private initPayPalButton(): void {
    if (window.paypal && this.paymentRef.nativeElement) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: this.fees
              }
            }]
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then(details => {
            if(details.status === 'COMPLETED'){
              // API to update feesPaid column to true in StudentClass Model and show registered
              // else show registered but fees not paid yet
              alert('Registration Complete!')
              this.router.navigate(['/dash']);
            }
            console.log('Transaction completed by ' + details.payer.name.given_name);
          });
        }
      }).render(this.paymentRef.nativeElement);
    } else {
      console.error('PayPal Buttons or paymentRef not available');
    }
  }
}
