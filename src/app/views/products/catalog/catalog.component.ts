import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {ProductsService} from "../../../shared/services/products.service";
import {Router} from "@angular/router";
import {Subscription, tap} from "rxjs";
import {ProductService} from "../../../shared/services/product.service";

@Component({
  selector: 'catalog-component',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {
  products: ProductType[] = [];
  subscription: Subscription | null = null;
  loading: boolean = false;

  constructor(private productsService: ProductsService,
              private router: Router,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.subscription = this.productsService.getProducts()
        .pipe(
          tap((): void => {
            this.loading = false;
          })
        )
        .subscribe(
          {
            next: (data: ProductType[]): void => {
              this.products = data;
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

  showProduct(num: number, str: string) {
    this.productService.productId = num;
    this.productService.productTitle = str;
    this.router.navigate(['/product'], {queryParams: {id: num, product: str}});
  }
}
