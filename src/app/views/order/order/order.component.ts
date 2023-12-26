import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsService} from "../../../shared/services/products.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'order-component',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  productName: string = '';
  valid: boolean = true;
  gotError: boolean = false;
  errorMessage: string | undefined = '';
  orderForm = this.fb.group({
    product: [''],
    name: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яёА-Я]+$')]],
    last_name: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яёА-Я]+$')]],
    phone: ['', [Validators.required, Validators.pattern('^\\+?\\d{11}$')]],
    country: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яёА-Я]+$')]],
    zip: ['', [Validators.required, Validators.pattern('^\\d{6}$')]],
    address: ['', [Validators.required, Validators.pattern('[a-zA-Zа-яёА-Я\\d\\s-\\/\\\\]+')]],
    comment: ['']
  });

  subscriptionOrder: Subscription | null = null;
  constructor(private activatedRoute: ActivatedRoute, private productsService: ProductsService, private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['product']) {
        this.productName = params['product'];
      }
    })
    this.orderForm.patchValue({product: this.productName})
  }

  createOrder(form: any) {
    this.subscriptionOrder = this.productsService.createOrder(form.value)
      .subscribe(response =>{
        if(response.success && !response.message){
          this.valid = false;
          this.gotError = false;
        }else {
          this.gotError = true;
          this.errorMessage = response.message;
        }
      });
  }

  goToMain(){
    this.router.navigate(['/']);
    this.valid = true;
  }
  ngOnDestroy() {
    this.subscriptionOrder?.unsubscribe();
  }
}
