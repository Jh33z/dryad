import { Component } from '@angular/core';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [NavBarComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
