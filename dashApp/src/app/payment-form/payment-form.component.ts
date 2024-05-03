import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment'; // Adjust the path as necessary
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
              this.router.navigate(['/dashboard']);
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


// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { PaymentService } from './payment.service';
// import { StripeCardElementOptions, StripeElements, StripeElementsOptions } from '@stripe/stripe-js';
// import { StripeService } from 'ngx-stripe';


// @Component({
//   selector: 'app-payment-form',
//   templateUrl: './payment-form.component.html',
//   styleUrls: ['./payment-form.component.css']
// })
// export class PaymentFormComponent implements OnInit {
//   // @ViewChild(StripeCardNumberComponent) card: StripeCardNumberComponent;
  

//   programId?: number;
//   fees?: number;
//   studentId?: number;
//   elements!: StripeElements;
//   card: any; 
//   cardOptions: StripeCardElementOptions = {
//     style: {
//       base: {
//         iconColor: '#666EE8',
//         color: '#31325F',
//         lineHeight: '40px',
//         fontWeight: 300,
//         fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//         fontSize: '18px',
//         '::placeholder': {
//           color: '#CFD7E0'
//         }
//       }
//     }
//   };
//   elementsOptions: StripeElementsOptions = {
//     locale: 'en'
//   };
//   showPaymentOptions: boolean = false;
//   paymentError: string | null | undefined = null;
//   paymentSuccess: boolean = false;

//   // @ViewChild('cardInfo') cardInfo!: ElementRef;
//   // ngAfterViewInit() {
//   //   // Now it's safe to use cardInfo
//   //   console.log("well")
//   //   console.log(this.cardInfo.nativeElement, "card info");
//   // }

//   @ViewChild('paymentRef', {static:true}) paymentRef!: ElementRef;

//   constructor(
//     private route: ActivatedRoute,
//     private stripeService: StripeService,
//     private paymentService: PaymentService
//   ) { }

//   ngOnInit(): void {
//      // Retrieve the state object from ActivatedRoute
//      this.route.paramMap.subscribe(params => {
//       const state = window.history.state;
//       if (state) {
//         this.programId = state.programId;
//         this.fees = state.fees;
//         this.studentId = state.studentId;
//       }
//     });
//     console.log(window.paypal);
//     // window.paypal.Buttons().render(this.paymentRef.nativeElement);
//   }

  
//   togglePaymentOptions(): void {
//     this.showPaymentOptions = !this.showPaymentOptions;
//     this.paymentError = null;  // Reset payment messages
//     this.paymentSuccess = false;

//     // if (this.showPaymentOptions) {
//     //   setTimeout(() => {
//     //     this.setupStripeCard();
//     //   }, 0);
//     // }

//     // if (this.showPaymentOptions && !this.card) {
//     //   this.stripeService.elements(this.elementsOptions).subscribe(elements => {
//     //     this.card = elements.create('card', this.cardOptions);
//     //     this.card.mount(this.cardInfo.nativeElement);
//     //   });
//     // }
//   }

//   // setupStripeCard(): void {
//   //   this.stripeService.elements(this.elementsOptions).subscribe(elements => {
//   //     this.card = elements.create('card', this.cardOptions);
//   //     if (this.cardInfo && this.cardInfo.nativeElement) {
//   //       this.card.mount(this.cardInfo.nativeElement);
//   //     } else {
//   //       console.error('CardInfo element not available.');
//   //     }
//   //   });
//   // }

//   pay(): void {
//     this.paymentService.createPaymentIntent(this.fees, this.studentId).subscribe({
//       next: (intent) => {
//         this.stripeService.confirmCardPayment(intent.client_secret, {
//           payment_method: {
//             card: this.card,
//             billing_details: {
//               name: 'Test User'
//             }
//           }
//         }).subscribe({
//           next: (result) => {
//             if (result.error) {
//               this.paymentError = result.error.message ?? "An unknown error occurred";
//               this.paymentSuccess = false;
//             } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
//               this.paymentSuccess = true;
//               this.paymentError = null;
//             }
//           },
//           error: (err) => {
//             this.paymentError = `Payment failed: ${err.message}`;
//             this.paymentSuccess = false;
//           }
//         });
//       },
//       error: (err) => {
//         this.paymentError = `Failed to create payment intent: ${err.message}`;
//         this.paymentSuccess = false;
//       }
//     });
//   }
//   // pay(): void {
//   //   this.paymentService.createPaymentIntent(this.fees, this.studentId).subscribe((intent) => {
//   //     this.stripeService.confirmCardPayment(intent.client_secret, {
//   //       payment_method: {
//   //         card: this.stripeService.elements(this.elementsOptions).create('card', this.cardOptions),
//   //         billing_details: {
//   //           name: 'Test User'
//   //         }
//   //       }
//   //     }).then(result => {
//   //       if (result.error) {
//   //         // Inform the user if there was an error
//   //         console.error(result.error.message);
//   //       } else {
//   //         // The payment has been processed!
//   //         if (result.paymentIntent.status === 'succeeded') {
//   //           console.log('Payment successful!');
//   //         }
//   //       }
//   //     });
//   //   });
//   // }

// }

