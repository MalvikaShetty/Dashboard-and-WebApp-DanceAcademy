// import { Injectable, ElementRef } from '@angular/core';
// import { loadStripe, Stripe, StripeCardElement, StripeCardElementOptions } from '@stripe/stripe-js';
// import { environment } from '../../environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class StripeService {
//     stripe: Stripe | null = null;

//   async setupStripeElements(cardElement: ElementRef): Promise<void> {
//     this.stripe = await loadStripe(environment.STRIPE_KEY);
//     const elements = this.stripe.elements();
//     const cardOptions: StripeCardElementOptions = {
//       style: {
//         base: {
//           fontSize: '16px',
//           fontFamily: '"Helvetica Neue", sans-serif'
//         }
//       }
//     };
//     const card = elements.create('card', cardOptions);
//     card.mount(cardElement.nativeElement);
//   }

//   async processPayment(programId: number, fees: number): Promise<void> {
//     const { error } = await this.stripe.confirmCardPayment('<YOUR_PAYMENT_INTENT_CLIENT_SECRET>', {
//       payment_method: {
//         card: this.stripe.elements().getElement(StripeCardElement),
//         billing_details: {
//           name: 'Test User'
//         }
//       }
//     });
//     if (error) {
//       throw new Error(error.message);
//     }
//   }
// }
