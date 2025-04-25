import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {NgClass} from '@angular/common';
import {filter} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  isHomePage: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Set initial state
    this.checkIfHomePage(this.router.url);

    // Listen for route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.checkIfHomePage(event.url);
    });
  }

  private checkIfHomePage(url: string) {
    this.isHomePage = url === '/' || url === '/home' || url === '/landing';
  }
}
