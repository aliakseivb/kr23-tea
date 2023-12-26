import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productId: number = 0;
  productTitle: string = '';
}
