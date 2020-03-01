import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../shared/services/products.service';
import {Product} from '../shared/interfaces/product';
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: Product[];

  constructor(
    private prod: ProductsService
  ) {
  }

  ngOnInit(): void {
    const pSub = this.prod.getProducts()
      .pipe(delay(1500))
      .subscribe(
      res => {
        this.products = res;
      }
    );
  }

}
