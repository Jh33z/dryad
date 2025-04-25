import {Component, input, signal} from '@angular/core';

import {CardComponent} from './card/card.component';
import {Card} from '../models/card';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-section-wrapper',
  imports: [CommonModule,CardComponent, CardComponent],
  templateUrl: './section-wrapper.component.html',
  styleUrl: './section-wrapper.component.css'
})
export class SectionWrapperComponent {
 sectionData = input<Card[]>([])

}




