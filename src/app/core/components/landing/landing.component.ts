import {Component, computed, ElementRef, inject, Signal, ViewChild} from '@angular/core';
import { CardModule } from 'primeng/card';
import {TestimonialsComponent} from '../testimonials/testimonials.component';
import {SectionWrapperComponent} from '../../../shared/section-wrapper/section-wrapper.component';
import {LandingDataService} from '../../services/landing-data.service';
import {Card} from '../../../shared/models/card';
import {toSignal} from '@angular/core/rxjs-interop';
import {
  ProductionsWrapperComponent
} from '../../../shared/productions/productions-wrapper/productions-wrapper.component';
import {Production} from '../../../shared/models/productions';

@Component({
  selector: 'app-landing',
  imports: [CardModule,  ProductionsWrapperComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  landingService = inject(LandingDataService)
  // customCardsSignal = toSignal(this.landingService.fetchCustomizedCards())
  productionsSignal = toSignal(this.landingService.fetchProductions())
  // public planFurnitureData:Signal<Card[]> = computed(() =>this.customCardsSignal() as Card[])
  public productions:Signal<Production[]> = computed(()=> this.productionsSignal() as Production[])


  @ViewChild('targetSection', { read: ElementRef }) targetSection!: ElementRef;

  scrollToSection(): void {
    this.targetSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
