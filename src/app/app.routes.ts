import {Routes} from '@angular/router';
import {LandingComponent} from './core/components/landing/landing.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent },
  {path:'customize/:id', loadComponent:()=>import('./core/components/customize/customize.component').then(m => m.CustomizeComponent)},
  {
    path: 'product/:id',
    loadComponent: () => import('./core/components/product/product.component').then(m => m.ProductComponent)
  },
  {
    path:'success',
    loadComponent: ()=>import('./core/components/success-page/success-page.component').then(m => m.SuccessPageComponent)
  },
  {
    path: 'orders/:id',
    loadComponent: () => import('./core/components/success-page/order-details/order-details.component').then(c => c.OrderDetailsComponent)
  },
  {
    path:'**',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];
