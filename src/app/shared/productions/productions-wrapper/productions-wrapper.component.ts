import {Component, input, Input} from '@angular/core';
import {CardComponent} from "../../section-wrapper/card/card.component";
import {ProductionsCardComponent} from '../productions-card/productions-card.component';
import {Card} from '../../models/card';
import {Production} from '../../models/productions';

@Component({
  selector: 'app-productions-wrapper',
  imports: [
    ProductionsCardComponent
  ],
  templateUrl: './productions-wrapper.component.html',
  styleUrl: './productions-wrapper.component.css'
})
export class ProductionsWrapperComponent {
  productionsData = input<Production[]>([])
}
