import {Component, inject, input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {Production} from '../../models/productions';
import {Router} from '@angular/router';
import {LandingDataService} from '../../../core/services/landing-data.service';

@Component({
  selector: 'app-productions-card',
  imports: [CommonModule,CardModule, ButtonModule],
  templateUrl: './productions-card.component.html',
  styleUrl: './productions-card.component.css'
})
export class ProductionsCardComponent {
  router = inject(Router)
  landingService = inject(LandingDataService)
  productions=input<Production>({} as Production);
  onPurchaseClick(prod:Production){
    this.landingService.selectedProduct.next(prod)
    this.router.navigate([`/customize/${prod.id}`]);
  }
}
