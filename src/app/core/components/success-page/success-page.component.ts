import {Component, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LandingDataService} from '../../services/landing-data.service';
import {Observable} from 'rxjs';
import {AsyncPipe, CommonModule} from '@angular/common';
import {Production} from '../../../shared/models/productions';

@Component({
  selector: 'app-success-page',
  imports: [
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './success-page.component.html',
  styleUrl: './success-page.component.css'
})
export class SuccessPageComponent implements OnInit {
  private router = inject(Router);
  private landingService = inject(LandingDataService)
  orderNumber: string = 'GE' + Math.floor(100000 + Math.random() * 900000);
  imgPath!: string
  selectedCraftsman$ = this.landingService.selectedCraftsman;

  ngOnInit() {
    this.landingService.selectedProduct.subscribe((product: Production) => {
        this.imgPath = product.imgPath;
      }
    )
  }

  goToOrderDetails() {
    this.router.navigate(['/orders', this.orderNumber]);
  }

  goToHomePage() {
    // Navigate to home page
    this.router.navigate(['/']);
  }
}
