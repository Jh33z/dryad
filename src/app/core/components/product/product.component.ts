import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {TabPanel, TabView} from 'primeng/tabview';
import {Rating} from 'primeng/rating';
import {ProgressBar} from 'primeng/progressbar';
import {Button} from 'primeng/button';
import {InputNumber} from 'primeng/inputnumber';
import {CurrencyPipe} from '@angular/common';
import {GalleriaModule} from 'primeng/galleria';
import {Breadcrumb} from 'primeng/breadcrumb';
import {FormsModule} from '@angular/forms';
import {ColorOption, Craftsmen, LandingDataService, Product} from '../../services/landing-data.service';
import {forkJoin, switchMap} from 'rxjs';
import {ProgressSpinner} from 'primeng/progressspinner';
import {TableModule} from 'primeng/table';

@Component({
  selector: 'app-product',
  imports: [
    TabPanel,
    TabView,
    Rating,
    ProgressBar,
    Button,
    InputNumber,
    CurrencyPipe,
    GalleriaModule,
    Breadcrumb,
    FormsModule,
    ProgressSpinner,
    TableModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  landingService = inject(LandingDataService)
  private router = inject(Router);
  private route = inject(ActivatedRoute)
  breadcrumbItems: MenuItem[] = [];
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  // Product data
  productId!: number;
  product!: Product;
  quantity: number = 1;
  selectedColor: string = '';
  isLoading: boolean = true;
  errorMessage: string = '';

  productImages: any[] = [];

  colorOptions: ColorOption[] = [];

  relatedProducts: Product[] = [];
  selectedCraftsman!:Craftsmen


  ngOnInit() {
    this.landingService.selectedProduct.subscribe((product: Product) => {console.log(product)})
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        this.productId = id;

        return forkJoin({
          product: this.landingService.getProductById(id),
          colorOptions: this.landingService.getColorOptions(),
          relatedProducts: this.landingService.getRelatedProducts(id)
        });
      })
    ).subscribe({
      next: (data) => {
        this.product = data.product;
        this.colorOptions = data.colorOptions;
        this.relatedProducts = data.relatedProducts;

        this.setupProductImages();

        this.selectedColor = this.product.attributes.color;

        // Set up breadcrumb
        this.setupBreadcrumb();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching product:', error);
        this.errorMessage = 'პროდუქტის ჩატვირთვა ვერ მოხერხდა. გთხოვთ სცადოთ მოგვიანებით.';
        this.isLoading = false;
      }
    });
  }
  onRowSelect(event: any) {
    console.log('Selected craftsman:', event.data);
    this.landingService.selectedCraftsman.next(event.data);
  }



  setupProductImages() {
    if (this.product.productImages && this.product.productImages.length > 0) {
      this.productImages = this.product.productImages.map((src, index) => ({
        src,
        alt: `${this.product.title} - სურათი ${index + 1}`
      }));
    } else {
      // If no product images array, use the main image
      this.productImages = [{
        src: this.product.imgPath,
        alt: this.product.title
      }];
    }
  }

  setupBreadcrumb() {
    this.breadcrumbItems = [
      { label: 'მთავარი', routerLink: '/' },
      { label: 'ავეჯი', routerLink: '/products' },
      { label: this.product.title }
    ];
  }

  // Select color handler
  selectColor(color: string) {
    this.selectedColor = color;
  }

  // Helper methods for review statistics
  getRatingPercentage(stars: number): number {
    if (!this.product || !this.product.reviews || this.product.reviews.length === 0) {
      return 0;
    }

    const reviewsWithThisRating = this.product.reviews.filter(review => Math.round(review.rating) === stars).length;
    return (reviewsWithThisRating / this.product.reviews.length) * 100;
  }

  getRatingCount(stars: number): number {
    if (!this.product || !this.product.reviews) {
      return 0;
    }

    return this.product.reviews.filter(review => Math.round(review.rating) === stars).length;
  }

  addToCart() {

  }

  // Buy now functionality
  buyNow() {
    this.addToCart();
    this.router.navigate(['/success']);
  }
}
