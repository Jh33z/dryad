import {Component, ElementRef, inject, signal, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {LandingDataService} from '../../services/landing-data.service';
import {Production} from '../../../shared/models/productions';
interface ColorOption {
  id: number;
  name: string;
  hex: string;
  selected: boolean;
}

interface SizeOption {
  id: number;
  name: string;
  price: number;
  selected: boolean;
}

interface AddOnOption {
  id: number;
  name: string;
  price: number;
  selected: boolean;
}
@Component({
  selector: 'app-customize',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './customize.component.html',
  styleUrl: './customize.component.css'
})
export class CustomizeComponent {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  router = inject(Router);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  landingService = inject(LandingDataService);
  form!: FormGroup;

  productIdSignal = signal<string>('');
  startingPrice = signal<number>(0);
  totalPriceSignal = signal<number>(0);

  // Mock data
  colors: ColorOption[] = [
    { id: 1, name: 'Black', hex: '#000000', selected: true },
    { id: 2, name: 'White', hex: '#FFFFFF', selected: false },
    { id: 3, name: 'Brown', hex: '#A52A2A', selected: false },
  ];

  sizes: SizeOption[] = [
    { id: 1, name: 'S', price: 0, selected: false },
    { id: 2, name: 'M', price: 0, selected: true },
    { id: 3, name: 'L', price: 5, selected: false },
    { id: 4, name: 'XL', price: 10, selected: false },
  ];

  addOnOptions: AddOnOption[] = [
    { id: 1, name: 'Premium Materials', price: 25, selected: false },
    { id: 2, name: 'Extended Warranty', price: 15, selected: false },
    { id: 3, name: 'Express Production', price: 20, selected: false },
  ];

  constructor() { }

  ngOnInit(): void {
    this.productIdSignal.set(this.route.snapshot.paramMap.get('id') as string);
    this.fetchDataToCustomize();

    // Create a form group with individually named controls
    const formControls: {[key: string]: FormControl} = {};

    this.addOnOptions.forEach((option) => {
      formControls['option' + option.id] = this.fb.control(option.selected);
    });

    this.form = this.fb.group(formControls);

    // Listen to form value changes
    this.form.valueChanges.subscribe(formValues => {
      // Update the selected state in your options array
      this.addOnOptions.forEach(option => {
        const controlName = 'option' + option.id;
        option.selected = formValues[controlName];
      });

      this.updateTotalPrice();
    });

    // Calculate initial total price
    this.updateTotalPrice();
  }

  updateTotalPrice() {
    let total = this.startingPrice();

    // Add size price
    const selectedSize = this.sizes.find(size => size.selected);
    if (selectedSize) {
      total += selectedSize.price;
    }

    // Add options price
    const addonsPrice = this.addOnOptions
      .filter(option => option.selected)
      .reduce((sum, option) => sum + option.price, 0);

    total += addonsPrice;

    // Update total price signal
    this.totalPriceSignal.set(total);

  }

  getSelectedAddOns(): AddOnOption[] {
    return this.addOnOptions.filter(option => option.selected);
  }

  fetchDataToCustomize() {
    this.landingService.selectedProduct.subscribe((product: Production) => {
      if (product) {
        this.startingPrice.set(product.price);
        this.updateTotalPrice(); // Update total price when base price changes
      }
    });
  }

  selectColor(color: ColorOption): void {
    this.colors.forEach(c => c.selected = false);
    color.selected = true;
  }

  selectSize(size: SizeOption): void {
    this.sizes.forEach(s => s.selected = false);
    size.selected = true;
  }

  seekToTime(seconds: number): void {
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      this.videoPlayer.nativeElement.currentTime = seconds;
      this.videoPlayer.nativeElement.play();
    }
  }

  onPurchaseClick(){

    this.router.navigate([`product/${this.productIdSignal()}`])
  }
}
