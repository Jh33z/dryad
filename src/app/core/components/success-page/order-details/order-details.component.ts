import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LandingDataService} from '../../../services/landing-data.service';
import {AsyncPipe, CommonModule, DatePipe} from '@angular/common';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-order-details',
  imports: [
    AsyncPipe,
    DatePipe,
    CommonModule
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private landingService = inject(LandingDataService)
  Math = Math; // To use Math in template
  orderNumber: string = '';
  currentDate: Date = new Date();
  product$:Observable<any> = this.landingService.selectedProduct
  craftsman$:Observable<any> = this.landingService.selectedCraftsman
  ngOnInit(): void {
    // Get order number from route params if available
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.orderNumber = params['id'];
      } else {
        this.orderNumber = 'GE' + Math.floor(100000 + Math.random() * 900000);
      }
    });

    // Use the existing BehaviorSubject from your service
    this.landingService.selectedProduct.subscribe();
    // No need to manually set the product data
  }

  goToHomePage() {
    // Navigate to home page - implement your navigation logic here
    window.location.href = '/';
  }
}
