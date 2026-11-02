import { Injectable } from '@angular/core';
import { PRODUCTS, CATEGORIES } from '../data/mock-data';
import { Product } from '../models/product';


@Injectable({ providedIn: 'root' })
export class ProductService {
  readonly products = PRODUCTS;
  readonly categories = CATEGORIES;

  getById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  similar(p: Product): Product[] {
    return this.products
      .filter(x => x.id !== p.id)
      .sort((a, b) => +(b.category === p.category) - +(a.category === p.category))
      .slice(0, 4);
  }
}