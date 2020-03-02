import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../shared/services/products.service';
import {Product} from '../shared/interfaces/product';

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
      .subscribe(
      res => {
        this.products = res;
      }
    );
  }

}
