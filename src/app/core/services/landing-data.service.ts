import {inject, Injectable, signal} from '@angular/core';
import {Card} from '../../shared/models/card';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Production} from '../../shared/models/productions';
export interface ProductAttribute {
  length: string;
  width: string;
  height: string;
  color: string;
}

export interface Material {
  name: string;
  description: string;
}

export interface Review {
  author: string;
  date: string;
  rating: number;
  title: string;
  comment: string;
}

export interface Product {
  id: number;
  imgPath: string;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  warranty?: string;
  attributes: ProductAttribute;
  description?: string;
  materials?: Material[];
  careInstructions?: string[];
  reviews?: Review[];
  productImages?: string[];
  craftsmens?:Craftsmen[]
}
export interface Craftsmen{
  name:string
  surname:string;
  price:number
}
export interface ColorOption {
  name: string;
  hex: string;
}

@Injectable({
  providedIn: 'root'
})
export class LandingDataService {
  apiUrl:string = 'http://localhost:3000';
  http = inject(HttpClient)

  selectedProduct:BehaviorSubject<Production> = new BehaviorSubject<Production>({} as Production);
  selectedCraftsman:BehaviorSubject<Craftsmen> = new BehaviorSubject<Craftsmen>({} as Craftsmen);
  fetchProductions():Observable<Production[]>{
    return this.http.get<Production[]>(`${this.apiUrl}/products`)
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[] | {products: Product[]}>(`${this.apiUrl}/products`).pipe(
      map(response => {
        // Check if response is an array directly or has a products property
        if (Array.isArray(response)) {
          return response;
        } else {
          return response.products || [];
        }
      })
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`).pipe(
      map(products => products.find(product => product.id === id) as Product)
    );
  }

  getColorOptions(): Observable<ColorOption[]> {
    return this.http.get<{colorOptions: ColorOption[]}>(`${this.apiUrl}/colorOptions`).pipe(
      map(response => response.colorOptions || [])
    );
  }

  getDeliveryInfo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/deliveryInfo`);
  }

  // Method to get related products (example implementation)
  getRelatedProducts(currentProductId: number, limit: number = 4): Observable<Product[]> {
    // Just get all products and filter out the current one
    return this.getAllProducts().pipe(
      map(products => {
       return products.filter(product => product.id !== currentProductId)
          .slice(0, limit)
      })

    );
  }
}
