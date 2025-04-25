import {Component, Input, input, signal} from '@angular/core';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {CommonModule} from '@angular/common';
import {Card} from '../../models/card';

@Component({
  selector: 'app-card',
  imports: [CommonModule,CardModule, ButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  card=input<Card>({imgPath:'', title:''})

}
