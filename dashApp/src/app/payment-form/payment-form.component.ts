import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from './payment.service';
import { StripeCardElementOptions, StripeElements, StripeElementsOptions } from '@stripe/stripe-js';
// import { StripeService } from 'ngx-stripe';


@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  // @ViewChild(StripeCardNumberComponent) card: StripeCardNumberComponent;

  programId?: number;
  fees?: number;
  studentId?: number;
  elements!: StripeElements;
  card: any; 
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };
  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  @ViewChild('cardInfo')
  cardInfo!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    // private stripeService: StripeService,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
     // Retrieve the state object from ActivatedRoute
     this.route.paramMap.subscribe(params => {
      const state = window.history.state;
      if (state) {
        // Retrieve the properties from the state object
        this.programId = state.programId;
        this.fees = state.fees;
        this.studentId = state.studentId;

        // Log the retrieved values for debugging
        console.log('Program ID:', this.programId);
        console.log('Fees:', this.fees);
        console.log('Student ID:', this.studentId);
      }
    });


    this.stripeService.elements(this.elementsOptions).subscribe(elements => {
      this.elements = elements;
      // Create card element
      this.card = this.elements.create('card', this.cardOptions);
      // Mount card element to the view
      this.card.mount(this.cardInfo.nativeElement);
    });

  }

  pay(): void {
    this.paymentService.createPaymentIntent(this.fees, this.studentId).subscribe({
      next: (intent) => {
        this.stripeService.confirmCardPayment(intent.client_secret, {
          payment_method: {
            card: this.card,
            billing_details: {
              name: 'Test User'
            }
          }
        }).subscribe({
          next: (result) => {
            if (result.error) {
              console.error(result.error.message);
            } else {
              if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
                console.log('Payment successful!');
              }
            }
          },
          error: (err) => console.error(err)
        });
      },
      error: (err) => console.error('Failed to create payment intent:', err)
    });
  }
  // pay(): void {
  //   this.paymentService.createPaymentIntent(this.fees, this.studentId).subscribe((intent) => {
  //     this.stripeService.confirmCardPayment(intent.client_secret, {
  //       payment_method: {
  //         card: this.stripeService.elements(this.elementsOptions).create('card', this.cardOptions),
  //         billing_details: {
  //           name: 'Test User'
  //         }
  //       }
  //     }).then(result => {
  //       if (result.error) {
  //         // Inform the user if there was an error
  //         console.error(result.error.message);
  //       } else {
  //         // The payment has been processed!
  //         if (result.paymentIntent.status === 'succeeded') {
  //           console.log('Payment successful!');
  //         }
  //       }
  //     });
  //   });
  // }

}

