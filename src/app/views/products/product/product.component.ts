import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {ProductsService} from "../../../shared/services/products.service";
import {ProductType} from "../../../../types/product.type";
import {Subscription, tap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  product: ProductType | null = null;
  subscription: Subscription | null = null;

  loading: boolean = false;

  constructor(
    private productService: ProductService,
    private productsService: ProductsService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.subscription = this.productsService.getProduct(this.productService.productId)
        .pipe(
          tap((): void => {
            this.loading = false;
          })
        )
        .subscribe(
          {
            next: (data: ProductType): void => {
              this.product = data;
            },
            error: error => {
              console.log(error)
              this.router.navigate(['/']);
            }
          }
        )
    }, 500);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  toOrder(name: string){
    this.router.navigate(['/order'], {queryParams: {product: name}});
  }
}
